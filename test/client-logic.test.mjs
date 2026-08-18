import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const source = readFileSync(join(root, 'lib', 'client.js'), 'utf8')

/** Load the generated browser bundle in a minimal VM and return its exports. */
function loadClientExports() {
  let spec
  const window = {
    __ModuleLoader__: {
      load(value) {
        spec = value
      },
    },
  }
  const context = vm.createContext({ window, Symbol, Object, console })
  vm.runInContext(source, context, { filename: 'lib/client.js' })
  assert.ok(spec, 'client bundle must register itself with window.__ModuleLoader__')
  const require = () => ({})
  const exports = spec.factory(require)
  assert.ok(exports && typeof exports.apply === 'function', 'client bundle must export apply')
  return exports
}

test('client bundle exports pure internals for testing', () => {
  const exports = loadClientExports()
  assert.equal(typeof exports.__internals.filterEntries, 'function')
  assert.equal(typeof exports.__internals.selectDetail, 'function')
  assert.equal(typeof exports.__internals.phaseLabel, 'function')
})

test('selectDetail returns null for no selection and missing ids', () => {
  const { selectDetail } = loadClientExports().__internals
  const entries = [{ entryId: 'a' }, { entryId: 'b' }]
  assert.equal(selectDetail(entries, null), null)
  assert.equal(selectDetail(entries, undefined), null)
  assert.equal(selectDetail(entries, 'a'), entries[0])
  assert.equal(selectDetail(entries, 'missing'), null)
})

test('filterEntries searches name, version, description, entry id, and runtime id', () => {
  const { filterEntries } = loadClientExports().__internals
  const entries = [
    {
      entryId: 'token-meter',
      runtimeEntryId: 'include:token-meter',
      packageName: '@deepseek-ai/dsh-token-meter',
      packageVersion: '0.1.0',
      packageDescription: 'Tracks model token usage',
      isDshPlugin: false,
    },
    {
      entryId: 'web-ui-pet',
      runtimeEntryId: 'include:web-ui-pet',
      packageName: '@linxin666/dsh-pet',
      packageVersion: '0.2.0',
      packageDescription: 'Floating pet companion',
      isDshPlugin: true,
    },
  ]
  assert.equal(filterEntries(entries, 'PET', false).length, 1)
  assert.equal(filterEntries(entries, 'token usage', false)[0].entryId, 'token-meter')
  assert.equal(filterEntries(entries, 'include:token-meter', false).length, 1)
  assert.equal(filterEntries(entries, '0.2.0', false).length, 1)
})

test('filterEntries honors the installed-plugins-only flag', () => {
  const { filterEntries } = loadClientExports().__internals
  const entries = [
    { entryId: 'a', isDshPlugin: false, packageName: 'core', packageDescription: 'core' },
    { entryId: 'b', isDshPlugin: true, packageName: 'plugin', packageDescription: 'plugin' },
  ]
  assert.equal(filterEntries(entries, '', true).length, 1)
  assert.equal(filterEntries(entries, '', true)[0].entryId, 'b')
})

test('phaseLabel maps runtime phases to locale keys', () => {
  const { phaseLabel } = loadClientExports().__internals
  const t = (key) => key
  assert.equal(phaseLabel('active', t), 'phaseActive')
  assert.equal(phaseLabel('failed', t), 'phaseFailed')
  assert.equal(phaseLabel(null, t), 'phaseUnobserved')
})
