import yaml from 'js-yaml'

/** True when a parsed YAML value is a `!!js` expression node. */
function isJsExpr(value) {
  return value !== null
    && typeof value === 'object'
    && Object.prototype.hasOwnProperty.call(value, '__jsExpr')
}

/** The profile patch-file YAML dialect: `!!js` scalars round-trip as expression nodes. */
const JsExprType = new yaml.Type('tag:yaml.org,2002:js', {
  kind: 'scalar',
  resolve: (data) => typeof data === 'string',
  construct: (data) => ({ __jsExpr: data }),
  predicate: isJsExpr,
  represent: (data) => data['__jsExpr'],
})

export const entryListSchema = yaml.JSON_SCHEMA.extend([JsExprType])

/**
 * Parse a profile `cordis.patch.yml` document into a patch array.
 * An empty document, comments-only document, or `null` all read as [].
 */
export function parsePatchFile(text) {
  if (text == null || text.trim() === '') return []
  const value = yaml.load(text, { schema: entryListSchema })
  if (value === undefined || value === null) return []
  if (!Array.isArray(value)) {
    throw new Error('cordis.patch.yml must contain a top-level array')
  }
  return value
}

/** Serialize a patch array back into YAML using the same `!!js`-aware schema. */
export function serializePatchList(entries) {
  return yaml.dump(entries, {
    schema: entryListSchema,
    lineWidth: -1,
    noRefs: true,
  })
}

/**
 * True when a patch entry is exactly the managed toggle shape
 * `{ id: <entryId>, disabled: true|false }`.
 */
export function isManagedToggle(patch, entryId) {
  if (patch === null || typeof patch !== 'object' || Array.isArray(patch)) return false
  if (patch.id !== entryId) return false
  const keys = Object.keys(patch).sort()
  return keys.length === 2 && keys[0] === 'disabled' && keys[1] === 'id'
}

/**
 * Upsert one managed enable/disable patch for `entryId`, preserving every
 * other patch entry. Toggling off writes `disabled: true`; toggling on
 * writes `disabled: false` so it also overrides a bundle-level disable.
 */
export function applyToggle(entries, entryId, enabled) {
  const next = entries.filter((patch) => !isManagedToggle(patch, entryId))
  next.push({ id: entryId, disabled: !enabled })
  return next
}
