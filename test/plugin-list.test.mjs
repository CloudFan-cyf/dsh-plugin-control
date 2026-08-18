import test from 'node:test'
import assert from 'node:assert/strict'
import { describeEntries } from '../src/plugin-list.js'

function entryOf(id, name) {
  return {
    id: 'include:' + id,
    options: { id, name },
    disabled: false,
  }
}

const profileDir = process.cwd()

test('settings-controlled entries reflect their settings namespace value', () => {
  const ctx = {
    loader: {
      entries() {
        return [entryOf('web-ui-pet', '@linxin666/dsh-pet')]
      },
    },
    settings: {
      describe() {
        return [{ ns: 'pet', value: { enabled: false } }]
      },
    },
  }
  const entries = describeEntries(ctx, profileDir)
  assert.equal(entries.length, 1)
  assert.equal(entries[0].enabled, false)
  assert.equal(entries[0].settingsControlled, true)
  assert.equal(entries[0].settingsNamespace, 'pet')
  assert.equal(entries[0].settingsField, 'enabled')
})

test('settings-controlled entries fall back to loader state when the namespace is absent', () => {
  const ctx = {
    loader: {
      entries() {
        return [entryOf('web-ui-pet', '@linxin666/dsh-pet')]
      },
    },
    settings: {
      describe() {
        return []
      },
    },
  }
  const entries = describeEntries(ctx, profileDir)
  assert.equal(entries[0].enabled, true)
  assert.equal(entries[0].settingsControlled, false)
})

test('loader-controlled entries are not flagged as settings-controlled', () => {
  const ctx = {
    loader: {
      entries() {
        return [entryOf('token-meter', '@deepseek-ai/dsh-token-meter')]
      },
    },
    settings: {
      describe() {
        return []
      },
    },
  }
  const entries = describeEntries(ctx, profileDir)
  assert.equal(entries[0].settingsControlled, false)
  assert.equal(entries[0].settingsNamespace, null)
  assert.equal(entries[0].toggleable, true)
})
