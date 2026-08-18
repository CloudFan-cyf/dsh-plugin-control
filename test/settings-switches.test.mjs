import test from 'node:test'
import assert from 'node:assert/strict'
import {
  applySwitchValue,
  buildSwitchOps,
  settingsSwitchFor,
} from '../src/settings-switches.js'

test('settingsSwitchFor resolves known adapters and rejects unknown entries', () => {
  assert.deepEqual(settingsSwitchFor('web-ui-pet'), { namespace: 'pet', field: 'enabled' })
  assert.deepEqual(settingsSwitchFor('pet'), { namespace: 'pet', field: 'enabled' })
  assert.equal(settingsSwitchFor('token-meter'), null)
  assert.equal(settingsSwitchFor(null), null)
  assert.equal(settingsSwitchFor(''), null)
})

test('buildSwitchOps emits a set op for the owned field', () => {
  assert.deepEqual(buildSwitchOps('web-ui-pet', false), [{ op: 'set', path: ['enabled'], value: false }])
  assert.deepEqual(buildSwitchOps('web-ui-pet', true), [{ op: 'set', path: ['enabled'], value: true }])
  assert.equal(buildSwitchOps('token-meter', false), null)
})

test('applySwitchValue reads the field with an enabled default', () => {
  assert.equal(applySwitchValue('web-ui-pet', { enabled: false }), false)
  assert.equal(applySwitchValue('web-ui-pet', { enabled: true }), true)
  assert.equal(applySwitchValue('web-ui-pet', {}), true)
  assert.equal(applySwitchValue('web-ui-pet', undefined), true)
  assert.equal(applySwitchValue('token-meter', { enabled: false }), undefined)
})
