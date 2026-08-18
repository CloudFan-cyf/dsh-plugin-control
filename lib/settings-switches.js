/**
 * Settings-aware switch adapters.
 *
 * Some plugins gate their user-visible surface through their OWN settings
 * namespace instead of the Loader entry enablement. Disabling the Loader
 * entry alone then leaves the already-mounted client UI behind while the
 * host routes disappear — the exact "zombie" symptom reported for dsh-pet
 * (the pet stays on screen, unresponsive, still draggable).
 *
 * For such plugins the plugin manager must toggle the settings field that
 * owns the surface (and keep the Loader entry enabled so the settings
 * namespace stays registered and the client can react). This table maps a
 * Loader entry id to its owning settings namespace + field.
 */
export const SETTINGS_SWITCHES = {
  // dsh-pet: pet.enabled=false hides the pet and stops polling (host stays up).
  'web-ui-pet': { namespace: 'pet', field: 'enabled' },
  'pet': { namespace: 'pet', field: 'enabled' },
}

/** Look up the adapter for one Loader entry id, or null when it is loader-controlled. */
export function settingsSwitchFor(entryId) {
  if (typeof entryId !== 'string' || entryId === '') return null
  return SETTINGS_SWITCHES[entryId] ?? null
}

/** Build the settings mutation ops that set the switch to `enabled`. */
export function buildSwitchOps(entryId, enabled) {
  const sw = settingsSwitchFor(entryId)
  if (sw === null) return null
  return [{ op: 'set', path: [sw.field], value: Boolean(enabled) }]
}

/**
 * Resolve the effective switch value from one settings section. Unknown
 * adapters or a missing field inherit the plugin's default (enabled).
 */
export function applySwitchValue(entryId, section) {
  const sw = settingsSwitchFor(entryId)
  if (sw === null) return undefined
  return section?.[sw.field] ?? true
}
