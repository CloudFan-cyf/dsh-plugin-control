const React = require('react')

const css = [
  ".dpc_section{display:flex;flex-direction:column;gap:14px;width:100%;max-width:760px}",
  ".dpc_toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap}",
  ".dpc_search{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;max-width:340px;height:36px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;padding:0 12px;font-size:13px}",
  ".dpc_search:focus-visible{border-color:var(--dsw-alias-state-business-primary)}",
  ".dpc_filter{display:inline-flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary);font-size:13px}",
  ".dpc_refresh{font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:6px 12px;font-size:13px}",
  ".dpc_grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none}",
  ".dpc_card{display:flex;flex-direction:column;gap:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;padding:14px;min-width:0}",
  ".dpc_cardHead{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;min-width:0}",
  ".dpc_cardTitle{display:flex;flex-direction:column;gap:4px;min-width:0}",
  ".dpc_name{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:600;line-height:1.4;overflow-wrap:anywhere}",
  ".dpc_entryId{color:var(--dsw-alias-label-tertiary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".dpc_badges{display:inline-flex;align-items:center;gap:6px;flex:none}",
  ".dpc_version{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;line-height:17px;white-space:nowrap}",
  ".dpc_badgeOn{background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 10%,transparent);color:var(--dsw-alias-state-success-primary);border-radius:999px;padding:1px 8px;font-size:11px;line-height:17px;white-space:nowrap}",
  ".dpc_badgeOff{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-tertiary);border-radius:999px;padding:1px 8px;font-size:11px;line-height:17px;white-space:nowrap}",
  ".dpc_desc{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:1.5;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}",
  ".dpc_cardFoot{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:auto;padding-top:4px}",
  ".dpc_protected{color:var(--dsw-alias-label-tertiary);font-size:12px}",
  ".dpc_switch{font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:5px 12px;font-size:12px;line-height:1.5}",
  ".dpc_switch:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed)}",
  ".dpc_switchOn{font:inherit;color:var(--dsw-alias-bg-layer-3);cursor:pointer;background:var(--dsw-alias-state-success-primary);border:1px solid var(--dsw-alias-state-success-primary);border-radius:8px;padding:5px 12px;font-size:12px;line-height:1.5}",
  ".dpc_switch:disabled{opacity:.5;cursor:default}",
  ".dpc_status{color:var(--dsw-alias-label-tertiary);margin:0;font-size:13px}",
  ".dpc_error{color:var(--dsw-alias-state-error-primary);display:flex;align-items:center;gap:10px;font-size:13px}",
  ".dpc_error button{font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;padding:4px 10px}",
  ".dpc_empty{color:var(--dsw-alias-label-tertiary);margin:0;font-size:13px}",
  "@media (width<=680px){.dpc_grid{grid-template-columns:minmax(0,1fr)}.dpc_search{max-width:none}}"
].join("")

const tagId = '@cloudfan-cyf/dsh-plugin-control/plugin-control.module.css'
if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
  const tag = document.createElement('style')
  tag.dataset.plugin = '@cloudfan-cyf/dsh-plugin-control'
  tag.dataset.pluginCss = tagId
  tag.textContent = css
  document.head.appendChild(tag)
}

const styles = {
  section: 'dpc_section',
  toolbar: 'dpc_toolbar',
  search: 'dpc_search',
  filter: 'dpc_filter',
  refresh: 'dpc_refresh',
  grid: 'dpc_grid',
  card: 'dpc_card',
  cardHead: 'dpc_cardHead',
  cardTitle: 'dpc_cardTitle',
  name: 'dpc_name',
  entryId: 'dpc_entryId',
  badges: 'dpc_badges',
  version: 'dpc_version',
  badgeOn: 'dpc_badgeOn',
  badgeOff: 'dpc_badgeOff',
  desc: 'dpc_desc',
  cardFoot: 'dpc_cardFoot',
  protected: 'dpc_protected',
  switch: 'dpc_switch',
  switchOn: 'dpc_switchOn',
  status: 'dpc_status',
  error: 'dpc_error',
  empty: 'dpc_empty',
}

const zh = {
  title: '插件控制',
  description: '聚合管理当前 DSH 已安装插件：查看名称、版本与简介，并在线启用或停用。',
  loading: '正在读取插件…',
  error: '暂时无法读取插件。',
  retry: '重试',
  refresh: '刷新',
  search: '搜索插件',
  onlyDsh: '仅显示已安装插件',
  enabled: '已启用',
  disabled: '已停用',
  turnOn: '启用',
  turnOff: '停用',
  toggling: '切换中…',
  core: '核心插件',
  empty: '暂无插件。',
  noMatch: '没有匹配的插件。',
  noDescription: '暂无简介。',
  unknown: '未知插件',
}

const en = {
  title: 'Plugin Control',
  description: 'Manage installed DSH plugins in one place: name, version, description, and online enable or disable.',
  loading: 'Reading plugins…',
  error: 'Plugins are temporarily unavailable.',
  retry: 'Retry',
  refresh: 'Refresh',
  search: 'Search plugins',
  onlyDsh: 'Installed plugins only',
  enabled: 'Enabled',
  disabled: 'Disabled',
  turnOn: 'Enable',
  turnOff: 'Disable',
  toggling: 'Toggling…',
  core: 'Core plugin',
  empty: 'No plugins available.',
  noMatch: 'No matching plugins.',
  noDescription: 'No description.',
  unknown: 'Unknown plugin',
}

const h = React.createElement

function PluginControlSection(props) {
  const { t } = props
  const [state, setState] = React.useState({ status: 'loading', entries: [], error: '' })
  const [query, setQuery] = React.useState('')
  const [onlyDsh, setOnlyDsh] = React.useState(false)
  const [busyId, setBusyId] = React.useState(null)

  const load = React.useCallback(async () => {
    setState((previous) => ({ ...previous, status: 'loading', error: '' }))
    try {
      const response = await fetch('/api/dsh-plugin-control/plugins', { headers: { accept: 'application/json' } })
      if (!response.ok) throw new Error('HTTP ' + response.status)
      const payload = await response.json()
      if (payload === null || payload.ok !== true || !Array.isArray(payload.entries)) {
        throw new Error('bad payload')
      }
      setState({ status: 'ready', entries: payload.entries, error: '' })
    } catch (error) {
      setState({ status: 'error', entries: [], error: error && error.message ? error.message : String(error) })
    }
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  const toggle = async (entry) => {
    if (busyId !== null || !entry.toggleable) return
    setBusyId(entry.entryId)
    try {
      const response = await fetch('/api/dsh-plugin-control/toggle', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ entryId: entry.entryId, enabled: !entry.enabled }),
      })
      const payload = await response.json().catch(() => null)
      if (!response.ok || payload === null || payload.ok !== true) {
        throw new Error(payload && payload.message ? payload.message : 'HTTP ' + response.status)
      }
      if (Array.isArray(payload.entries)) {
        setState({ status: 'ready', entries: payload.entries, error: '' })
      } else {
        await load()
      }
    } catch (error) {
      setState((previous) => ({
        ...previous,
        status: 'ready',
        error: error && error.message ? error.message : String(error),
      }))
    } finally {
      setBusyId(null)
    }
  }

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return state.entries.filter((entry) => {
      if (onlyDsh && !entry.isDshPlugin) return false
      if (needle.length === 0) return true
      return [
        entry.moduleName,
        entry.packageName,
        entry.packageVersion,
        entry.packageDescription,
        entry.entryId,
      ].filter(Boolean).join(' ').toLowerCase().includes(needle)
    })
  }, [state.entries, query, onlyDsh])

  const renderCard = (entry) => {
    const busy = busyId === entry.entryId
    const name = entry.packageName || entry.moduleName || entry.entryId || t('unknown')
    const description = entry.packageDescription || t('noDescription')
    return h('li', { key: entry.entryId ?? entry.moduleName, className: styles.card },
      h('div', { className: styles.cardHead },
        h('div', { className: styles.cardTitle },
          h('span', { className: styles.name, title: name }, name),
          entry.entryId ? h('code', { className: styles.entryId, title: entry.entryId }, entry.entryId) : null,
        ),
        h('span', { className: styles.badges },
          entry.packageVersion ? h('span', { className: styles.version }, 'v' + entry.packageVersion) : null,
          h('span', { className: entry.enabled ? styles.badgeOn : styles.badgeOff }, entry.enabled ? t('enabled') : t('disabled')),
        ),
      ),
      h('p', { className: styles.desc }, description),
      h('div', { className: styles.cardFoot },
        entry.protected ? h('span', { className: styles.protected }, t('core')) : null,
        entry.toggleable ? h('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': entry.enabled ? 'true' : 'false',
          className: entry.enabled ? styles.switchOn : styles.switch,
          disabled: busy,
          onClick: () => { void toggle(entry) },
        }, busy ? t('toggling') : (entry.enabled ? t('turnOff') : t('turnOn'))) : null,
      ),
    )
  }

  return h('div', { className: styles.section },
    h('div', { className: styles.toolbar },
      h('input', {
        className: styles.search,
        type: 'search',
        placeholder: t('search'),
        'aria-label': t('search'),
        value: query,
        onChange: (event) => { setQuery(event.currentTarget.value) },
      }),
      h('label', { className: styles.filter },
        h('input', {
          type: 'checkbox',
          checked: onlyDsh,
          onChange: (event) => { setOnlyDsh(event.currentTarget.checked) },
        }),
        h('span', null, t('onlyDsh')),
      ),
      h('button', { type: 'button', className: styles.refresh, onClick: () => { void load() } }, t('refresh')),
    ),
    state.status === 'loading' ? h('p', { className: styles.status }, t('loading')) : null,
    state.status === 'error' ? h('div', { className: styles.error },
      h('p', { style: { margin: 0 } }, t('error') + (state.error ? ' - ' + state.error : '')),
      h('button', { type: 'button', onClick: () => { void load() } }, t('retry')),
    ) : null,
    state.status === 'ready' && state.entries.length === 0 ? h('p', { className: styles.empty }, t('empty')) : null,
    state.status === 'ready' && state.entries.length > 0 && filtered.length === 0 ? h('p', { className: styles.empty }, t('noMatch')) : null,
    filtered.length > 0 ? h('ul', { className: styles.grid }, filtered.map(renderCard)) : null,
  )
}

const inject = ['slots', 'locale']

function apply(ctx) {
  ctx.effect(() => ctx.locale.register('plugin-control', { zh, en }), 'plugin-control: dictionaries')
  ctx.slots.inject('settings.section', () => {
    const unregister = ctx.slots.register({
      name: 'settings.section',
      id: 'plugin-control',
      order: 120,
      label: () => ctx.locale.bind('plugin-control')('title'),
      locale: 'plugin-control',
    }, PluginControlSection)
    return () => { unregister() }
  })
}

exports.apply = apply
exports.inject = inject
