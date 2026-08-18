import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

/** The bundle row id this package inserts for itself. */
export const SELF_ENTRY_IDS = new Set(['plugin-control'])

/**
 * Core entries that must not be turned off from the GUI: disabling them can
 * remove the settings surface, the web server, or the loader that this
 * controller itself relies on.
 */
export const PROTECTED_ENTRY_IDS = new Set([
  'include',
  'loader',
  'timer',
  'hmr',
  'webserver',
  'web-startup',
  'web-runtime',
  'modules',
  'connection',
  'client-runtime',
  'cordis-client-runner',
  'api-gateway',
  'api-remotes',
  'settings',
  'plugin-inventory',
  'ui-layout',
  'ui-sidebar',
  'ui-settings',
  'ui-settings-general',
  'locale',
  'ui-theme',
])

/** Cordis FiberState numeric values mapped to stable wire strings. */
const FIBER_PHASE = {
  0: 'pending',
  1: 'loading',
  2: 'active',
  3: 'failed',
  4: null,
  5: 'unloading',
}

/**
 * Normalize a Loader module specifier to an npm package name, or null when
 * it is a Loader builtin (`cordis:*`) or a relative/local specifier.
 */
export function normalizePackageName(moduleName) {
  if (typeof moduleName !== 'string' || moduleName === '') return null
  if (moduleName.startsWith('cordis:')) return null
  if (moduleName.startsWith('.') || moduleName.startsWith('/')) return null
  if (moduleName.startsWith('@')) {
    const parts = moduleName.split('/')
    if (parts.length < 2) return null
    return parts.slice(0, 2).join('/')
  }
  return moduleName.split('/')[0]
}

function readPackageInfo(packageName, profileDir) {
  const home = process.env.DSH_HOME || join(homedir(), '.dsh')
  const roots = [
    join(profileDir, 'node_modules', packageName, 'package.json'),
    join(home, 'profiles', 'node_modules', packageName, 'package.json'),
  ]
  for (const file of roots) {
    if (!existsSync(file)) continue
    try {
      const pkg = JSON.parse(readFileSync(file, 'utf8'))
      return {
        packageName,
        packageVersion: typeof pkg.version === 'string' ? pkg.version : null,
        packageDescription: typeof pkg.description === 'string' ? pkg.description : null,
        isDshPlugin: Boolean(pkg.dsh),
      }
    } catch {
      // fall through to the next root
    }
  }
  return {
    packageName,
    packageVersion: null,
    packageDescription: null,
    isDshPlugin: false,
  }
}

/**
 * Project the current Loader tree into the card-list wire shape. This is a
 * point-in-time snapshot; the Loader remains the lifecycle authority.
 */
export function describeEntries(ctx, profileDir) {
  const entries = []
  for (const entry of ctx.loader.entries()) {
    if (entry.options?.group) continue
    // entry.id is the runtime-qualified nested id (e.g. include:plugin-control);
    // entry.options.id is the stable id used by patch files and dump-config.
    const entryId = typeof entry.options?.id === 'string' ? entry.options.id : null
    const runtimeEntryId = typeof entry.id === 'string' ? entry.id : null
    const moduleName = entry.options?.name
    const packageName = normalizePackageName(moduleName)
    const meta = packageName === null
      ? { packageName: null, packageVersion: null, packageDescription: null, isDshPlugin: false }
      : readPackageInfo(packageName, profileDir)
    const isSelf = entryId !== null && SELF_ENTRY_IDS.has(entryId)
    const protectedEntry = entryId !== null && PROTECTED_ENTRY_IDS.has(entryId)
    entries.push({
      entryId,
      runtimeEntryId,
      moduleName: typeof moduleName === 'string' ? moduleName : null,
      packageName: meta.packageName,
      packageVersion: meta.packageVersion,
      packageDescription: meta.packageDescription,
      isDshPlugin: meta.isDshPlugin,
      enabled: entry.disabled !== true,
      fiberPhase: entry.fiber === undefined ? null : (FIBER_PHASE[entry.fiber.state] ?? null),
      protected: protectedEntry,
      toggleable: entryId !== null && !protectedEntry && !isSelf,
    })
  }
  entries.sort((a, b) => {
    const left = a.packageName ?? a.moduleName ?? ''
    const right = b.packageName ?? b.moduleName ?? ''
    return left.localeCompare(right) || (a.entryId ?? '').localeCompare(b.entryId ?? '')
  })
  return entries
}
