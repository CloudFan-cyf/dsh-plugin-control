import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { applyToggle, parsePatchFile, serializePatchList } from './patch-store.js'
import { describeEntries } from './plugin-list.js'

const API_PREFIX = '/api/dsh-plugin-control'
const MAX_JSON_BODY_BYTES = 64 * 1024
const POLL_INTERVAL_MS = 100
const POLL_TIMEOUT_MS = 10000
const BACKUP_SUFFIX = '.dsh-plugin-control.bak'

/** IPv4 127/8 predicate. */
function isIPv4Loopback(v4) {
  const parts = v4.split('.')
  return parts.length === 4
    && parts[0] === '127'
    && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255)
}

/** Whether a socket remote address names the loopback range (127/8, ::1, IPv4-mapped). */
function isLoopbackAddress(address) {
  if (address === undefined) return false
  const normalized = address.toLowerCase()
  if (normalized === '::1') return true
  if (normalized.startsWith('::ffff:')) return isIPv4Loopback(normalized.slice('::ffff:'.length))
  return isIPv4Loopback(normalized)
}

/** Whether a normalized URL hostname names the loopback authority. */
function isLoopbackHostname(hostname) {
  if (hostname === 'localhost' || hostname === '[::1]') return true
  return isIPv4Loopback(hostname)
}

/** Request-level loopback + browser same-origin fence. */
function isLoopbackRequest(request) {
  if (!isLoopbackAddress(request.socket.remoteAddress)) return false
  const host = request.headers.host
  if (typeof host !== 'string') return false
  let hostUrl
  try {
    hostUrl = new URL('http://' + host)
  } catch {
    return false
  }
  if (!isLoopbackHostname(hostUrl.hostname)) return false
  if (request.headers['sec-fetch-site'] === 'cross-site') return false
  const origin = request.headers.origin
  if (origin === undefined) return true
  try {
    return new URL(origin).host === hostUrl.host
  } catch {
    return false
  }
}

function writeJson(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'referrer-policy': 'no-referrer',
  })
  res.end(payload)
}

async function readJsonBody(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    const buffer = typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    size += buffer.length
    if (size > MAX_JSON_BODY_BYTES) return null
    chunks.push(buffer)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return null
  }
}

/**
 * Build the loopback-only HTTP route family. Mutations are serialized through
 * one promise queue so concurrent toggles cannot interleave read-modify-write
 * passes on the patch file.
 */
export function makeRoutes({ ctx, profileDir }) {
  const patchPath = join(profileDir, 'cordis.patch.yml')
  let writeQueue = Promise.resolve()

  const findEntry = (entryId) => {
    for (const entry of ctx.loader.entries()) {
      if (entry.id === entryId) return entry
    }
    return undefined
  }

  const list = () => describeEntries(ctx, profileDir)

  const enqueueWrite = (work) => {
    const run = writeQueue.then(work, work)
    writeQueue = run.catch(() => {})
    return run
  }

  const writePatchFile = (content) => {
    mkdirSync(dirname(patchPath), { recursive: true })
    const tmp = patchPath + '.tmp'
    writeFileSync(tmp, content, 'utf8')
    renameSync(tmp, patchPath)
  }

  const waitForEntryState = (entryId, enabled) => {
    const deadline = Date.now() + POLL_TIMEOUT_MS
    return new Promise((resolve) => {
      const tick = () => {
        const entry = findEntry(entryId)
        if (entry === undefined) {
          resolve({ found: false, applied: false })
          return
        }
        if ((entry.disabled === true) === !enabled) {
          resolve({ found: true, applied: true })
          return
        }
        if (Date.now() >= deadline) {
          resolve({ found: true, applied: false })
          return
        }
        setTimeout(tick, POLL_INTERVAL_MS)
      }
      tick()
    })
  }

  const guard = (req, res, method) => {
    if (!isLoopbackRequest(req)) {
      writeJson(res, 403, { ok: false, code: 'forbidden', message: 'loopback-only endpoint' })
      return false
    }
    if (req.method !== method) {
      writeJson(res, 405, { ok: false, code: 'method-not-allowed', message: 'method not allowed: ' + (req.method ?? '') })
      return false
    }
    return true
  }

  const routes = [
    {
      kind: 'exact',
      path: API_PREFIX + '/plugins',
      handler: async (req, res) => {
        if (!guard(req, res, 'GET')) return
        writeJson(res, 200, { ok: true, entries: list() })
      },
    },
    {
      kind: 'exact',
      path: API_PREFIX + '/toggle',
      handler: async (req, res) => {
        if (!guard(req, res, 'POST')) return
        const body = await readJsonBody(req)
        if (body === null || typeof body.entryId !== 'string' || typeof body.enabled !== 'boolean') {
          writeJson(res, 400, { ok: false, code: 'bad-request', message: 'entryId and enabled are required' })
          return
        }
        const entry = findEntry(body.entryId)
        if (entry === undefined) {
          writeJson(res, 400, { ok: false, code: 'unknown-entry', message: 'unknown plugin entry: ' + body.entryId })
          return
        }
        if (entry.options?.group) {
          writeJson(res, 400, { ok: false, code: 'group-entry', message: 'group entries cannot be toggled' })
          return
        }
        const descriptor = list().find((item) => item.entryId === body.entryId)
        if (descriptor === undefined || !descriptor.toggleable) {
          writeJson(res, 403, { ok: false, code: 'protected', message: 'this plugin is protected and cannot be toggled' })
          return
        }
        try {
          const applied = await enqueueWrite(async () => {
            const currentText = existsSync(patchPath) ? readFileSync(patchPath, 'utf8') : ''
            const currentEntries = parsePatchFile(currentText)
            const nextEntries = applyToggle(currentEntries, body.entryId, body.enabled)
            const nextText = serializePatchList(nextEntries)
            if (nextText !== currentText) {
              if (existsSync(patchPath) && !existsSync(patchPath + BACKUP_SUFFIX)) {
                writeFileSync(patchPath + BACKUP_SUFFIX, currentText, 'utf8')
              }
              writePatchFile(nextText)
            }
            const wait = await waitForEntryState(body.entryId, body.enabled)
            return wait.applied
          })
          writeJson(res, 200, { ok: true, applied, entries: list() })
        } catch (error) {
          writeJson(res, 500, {
            ok: false,
            code: 'write-failed',
            message: error instanceof Error ? error.message : String(error),
          })
        }
      },
    },
  ]

  return { routes, patchPath }
}
