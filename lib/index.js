import { existsSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { makeRoutes } from './routes.js'

export const name = 'plugin-control'

/** Services required before this plugin can register its routes. */
export const inject = ['webServer', 'loader', 'settings']

const SELF_PACKAGE = '@cloudfan-cyf/dsh-plugin-control'

const MOUNTED = Symbol.for('dsh-plugin-control.mounted')

function mountedSet() {
  const registry = globalThis
  return (registry[MOUNTED] ??= new Set())
}

/** Host single-instance guard shared across module copies. */
function mountOnce(packageName, fn) {
  return (...args) => {
    const mounted = mountedSet()
    if (mounted.has(packageName)) return
    mounted.add(packageName)
    args[0]?.effect?.(() => () => {
      mounted.delete(packageName)
    })
    return fn(...args)
  }
}

/**
 * Resolve the active profile directory. The root context's `baseUrl` is the
 * profile directory because DSH anchors the root include there; fall back to
 * scanning `$DSH_HOME/profiles` for the profile that contains this package.
 */
function resolveProfileDir(ctx) {
  const base = ctx.baseUrl ?? ctx.loader?.ctx?.baseUrl
  if (base) {
    try {
      return fileURLToPath(base)
    } catch {
      // fall through to profile scanning
    }
  }
  const home = process.env.DSH_HOME || join(homedir(), '.dsh')
  const profilesDir = join(home, 'profiles')
  if (existsSync(profilesDir)) {
    const entries = readdirSync(profilesDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    for (const entry of entries) {
      const profileDir = join(profilesDir, entry.name)
      if (existsSync(join(profileDir, 'node_modules', SELF_PACKAGE, 'package.json'))) {
        return profileDir
      }
    }
    const candidates = entries.filter((entry) => existsSync(join(profilesDir, entry.name, 'cordis.patch.yml')))
    if (candidates.length === 1) return join(profilesDir, candidates[0].name)
  }
  throw new Error('plugin-control: unable to resolve the active profile directory')
}

function applyImpl(ctx) {
  const profileDir = resolveProfileDir(ctx)
  const { routes } = makeRoutes({ ctx, profileDir })
  ctx.effect(() => {
    const disposers = routes.map((route) => ctx.webServer.register(route))
    return () => {
      for (const dispose of disposers) dispose()
    }
  }, 'plugin-control: routes')
}

export const apply = mountOnce(SELF_PACKAGE, applyImpl)
