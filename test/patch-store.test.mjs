import test from 'node:test'
import assert from 'node:assert/strict'
import {
  applyToggle,
  isManagedToggle,
  parsePatchFile,
  serializePatchList,
} from '../src/patch-store.js'

test('empty, comment-only, and null patch files parse to an empty array', () => {
  assert.deepEqual(parsePatchFile(''), [])
  assert.deepEqual(parsePatchFile('# just a comment\n'), [])
  assert.deepEqual(parsePatchFile('[]'), [])
  assert.deepEqual(parsePatchFile(null), [])
})

test('!!js expressions round-trip through parse and serialize', () => {
  const text = '- id: example\n  config:\n    value: !!js process.env.EXAMPLE\n'
  const parsed = parsePatchFile(text)
  assert.equal(parsed.length, 1)
  assert.equal(parsed[0].config.value.__jsExpr, 'process.env.EXAMPLE')
  const output = serializePatchList(parsed)
  assert.match(output, /!!js/)
  assert.match(output, /process\.env\.EXAMPLE/)
})

test('applyToggle adds a managed disabled patch for off', () => {
  const next = applyToggle([], 'web-ui-pet', false)
  assert.deepEqual(next, [{ id: 'web-ui-pet', disabled: true }])
  assert.equal(isManagedToggle(next[0], 'web-ui-pet'), true)
})

test('applyToggle adds a managed enabled patch for on', () => {
  const next = applyToggle([], 'web-ui-pet', true)
  assert.deepEqual(next, [{ id: 'web-ui-pet', disabled: false }])
})

test('applyToggle replaces a previous managed patch idempotently', () => {
  const first = applyToggle([], 'web-ui-pet', false)
  const second = applyToggle(first, 'web-ui-pet', false)
  const third = applyToggle(second, 'web-ui-pet', true)
  assert.deepEqual(third, [{ id: 'web-ui-pet', disabled: false }])
})

test('applyToggle preserves unrelated and richer user patches', () => {
  const patches = [
    { id: 'other', disabled: true },
    { id: 'web-ui-pet', config: { answer: 42 }, disabled: true },
  ]
  const next = applyToggle(patches, 'web-ui-pet', false)
  assert.equal(next.length, 3)
  assert.deepEqual(next[0], { id: 'other', disabled: true })
  assert.deepEqual(next[1], { id: 'web-ui-pet', config: { answer: 42 }, disabled: true })
  assert.deepEqual(next[2], { id: 'web-ui-pet', disabled: true })
})

test('parsePatchFile rejects a non-array document', () => {
  assert.throws(() => parsePatchFile('id: not-an-array\n'), /top-level array/)
})
