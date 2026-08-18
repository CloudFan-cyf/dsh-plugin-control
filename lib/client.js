window.__ModuleLoader__.load({
	id: "@cloudfan-cyf/dsh-plugin-control",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const React = require('react')

const css = [
  ".dpc_section{display:flex;flex-direction:column;gap:14px;width:100%;max-width:760px}",
  ".dpc_toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap}",
  ".dpc_search{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;max-width:340px;height:36px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;padding:0 12px;font-size:13px}",
  ".dpc_search:focus-visible{border-color:var(--dsw-alias-state-business-primary)}",
  ".dpc_filter{display:inline-flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary);font-size:13px}",
  ".dpc_refresh{font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:6px 12px;font-size:13px}",
  ".dpc_grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none}",
  ".dpc_card{display:flex;flex-direction:column;gap:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;padding:14px;min-width:0;cursor:pointer;transition:border-color .16s,background .16s}",
  ".dpc_card:hover{border-color:var(--dsw-alias-label-dimmed)}",
  ".dpc_card:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}",
  ".dpc_cardHead{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;min-width:0}",
  ".dpc_cardTitle{display:flex;flex-direction:column;gap:4px;min-width:0}",
  ".dpc_name{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:600;line-height:1.4;overflow-wrap:anywhere}",
  ".dpc_entryId{color:var(--dsw-alias-label-tertiary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  ".dpc_badges{display:inline-flex;align-items:center;gap:6px;flex:none;flex-wrap:wrap}",
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
  ".dpc_detail{display:flex;flex-direction:column;gap:14px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;padding:16px}",
  ".dpc_detailHead{display:flex;align-items:center;gap:10px;min-width:0}",
  ".dpc_back{font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:5px 10px;font-size:12px;white-space:nowrap}",
  ".dpc_back:hover{color:var(--dsw-alias-label-primary)}",
  ".dpc_detailTitle{color:var(--dsw-alias-label-primary);margin:0;font-size:16px;font-weight:600;line-height:1.4;overflow-wrap:anywhere;min-width:0}",
  ".dpc_detailSection{display:flex;flex-direction:column;gap:6px}",
  ".dpc_detailLabel{color:var(--dsw-alias-label-secondary);margin:0;font-size:12px;font-weight:600;line-height:1.5}",
  ".dpc_detailDesc{color:var(--dsw-alias-label-primary);margin:0;font-size:13px;line-height:1.6;overflow-wrap:anywhere;white-space:pre-wrap}",
  ".dpc_metaList{display:grid;grid-template-columns:120px minmax(0,1fr);gap:6px 10px;margin:0}",
  ".dpc_metaRow{display:contents}",
  ".dpc_metaKey{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:1.5}",
  ".dpc_metaValue{color:var(--dsw-alias-label-primary);font-size:12px;line-height:1.5;overflow-wrap:anywhere}",
  ".dpc_detailActions{display:flex;justify-content:flex-end;align-items:center;gap:8px;padding-top:4px}",
  ".dpc_relatedList{display:flex;flex-direction:column;gap:6px;margin:0;padding:0;list-style:none}",
  ".dpc_relatedItem{display:flex}",
  ".dpc_relatedButton{box-sizing:border-box;width:100%;font:inherit;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;justify-content:space-between;align-items:center;gap:10px;padding:8px 10px;display:flex}",
  ".dpc_relatedButton:hover{border-color:var(--dsw-alias-label-dimmed)}",
  ".dpc_relatedActive{border-color:var(--dsw-alias-state-business-primary)}",
  "@media (width<=680px){.dpc_grid{grid-template-columns:minmax(0,1fr)}.dpc_search{max-width:none}.dpc_metaList{grid-template-columns:minmax(0,1fr)}}"
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
  detail: 'dpc_detail',
  detailHead: 'dpc_detailHead',
  back: 'dpc_back',
  detailTitle: 'dpc_detailTitle',
  detailSection: 'dpc_detailSection',
  detailLabel: 'dpc_detailLabel',
  detailDesc: 'dpc_detailDesc',
  metaList: 'dpc_metaList',
  metaRow: 'dpc_metaRow',
  metaKey: 'dpc_metaKey',
  metaValue: 'dpc_metaValue',
  detailActions: 'dpc_detailActions',
  relatedList: 'dpc_relatedList',
  relatedItem: 'dpc_relatedItem',
  relatedButton: 'dpc_relatedButton',
  relatedActive: 'dpc_relatedActive',
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
  back: '返回列表',
  fullDescription: '完整简介',
  fieldPackage: '包名',
  fieldModule: '模块',
  fieldVersion: '版本',
  fieldEntryId: '配置 ID',
  fieldRuntimeId: '运行时 ID',
  fieldPhase: '运行阶段',
  fieldType: '类型',
  typeDsh: 'dsh 插件',
  typeBuiltin: '内置模块',
  notProvided: '未提供',
  related: '同包条目',
  phasePending: '等待依赖',
  phaseLoading: '加载中',
  phaseActive: '已挂载',
  phaseFailed: '挂载失败',
  phaseUnloading: '卸载中',
  phaseUnobserved: '未挂载',
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
  back: 'Back to list',
  fullDescription: 'Full description',
  fieldPackage: 'Package',
  fieldModule: 'Module',
  fieldVersion: 'Version',
  fieldEntryId: 'Config ID',
  fieldRuntimeId: 'Runtime ID',
  fieldPhase: 'Runtime phase',
  fieldType: 'Type',
  typeDsh: 'dsh plugin',
  typeBuiltin: 'Built-in module',
  notProvided: 'Not provided',
  related: 'Entries in this package',
  phasePending: 'Waiting for dependencies',
  phaseLoading: 'Loading',
  phaseActive: 'Mounted',
  phaseFailed: 'Mount failed',
  phaseUnloading: 'Unloading',
  phaseUnobserved: 'Not mounted',
}

const h = React.createElement

const PHASE_KEYS = {
  pending: 'phasePending',
  loading: 'phaseLoading',
  active: 'phaseActive',
  failed: 'phaseFailed',
  unloading: 'phaseUnloading',
}

function phaseLabel(phase, t) {
  if (phase === null || phase === undefined) return t('phaseUnobserved')
  return t(PHASE_KEYS[phase] || 'phaseUnobserved')
}

function filterEntries(entries, query, onlyDsh) {
  const needle = String(query ?? '').trim().toLowerCase()
  return entries.filter((entry) => {
    if (onlyDsh && !entry.isDshPlugin) return false
    if (needle.length === 0) return true
    return [
      entry.moduleName,
      entry.packageName,
      entry.packageVersion,
      entry.packageDescription,
      entry.entryId,
      entry.runtimeEntryId,
    ].filter(Boolean).join(' ').toLowerCase().includes(needle)
  })
}

function selectDetail(entries, selectedId) {
  if (selectedId === null || selectedId === undefined) return null
  return entries.find((entry) => entry.entryId === selectedId) ?? null
}

function PluginControlSection(props) {
  const { t } = props
  const [state, setState] = React.useState({ status: 'loading', entries: [], error: '' })
  const [query, setQuery] = React.useState('')
  const [onlyDsh, setOnlyDsh] = React.useState(false)
  const [busyId, setBusyId] = React.useState(null)
  const [selectedId, setSelectedId] = React.useState(null)

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

  const filtered = React.useMemo(
    () => filterEntries(state.entries, query, onlyDsh),
    [state.entries, query, onlyDsh],
  )

  const selected = selectDetail(state.entries, selectedId)

  const switchButton = (entry) => {
    if (!entry.toggleable) {
      return entry.protected ? h('span', { className: styles.protected }, t('core')) : null
    }
    const busy = busyId === entry.entryId
    return h('button', {
      type: 'button',
      role: 'switch',
      'aria-checked': entry.enabled ? 'true' : 'false',
      className: entry.enabled ? styles.switchOn : styles.switch,
      disabled: busy,
      onClick: (event) => {
        event.stopPropagation()
        void toggle(entry)
      },
    }, busy ? t('toggling') : (entry.enabled ? t('turnOff') : t('turnOn')))
  }

  const renderCard = (entry) => {
    const name = entry.packageName || entry.moduleName || entry.entryId || t('unknown')
    const description = entry.packageDescription || t('noDescription')
    return h('li', {
      key: entry.entryId ?? entry.runtimeEntryId ?? entry.moduleName,
      className: styles.card,
      role: 'button',
      tabIndex: 0,
      onClick: () => { setSelectedId(entry.entryId) },
      onKeyDown: (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setSelectedId(entry.entryId)
        }
      },
    },
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
        switchButton(entry),
      ),
    )
  }

  const renderDetail = (entry) => {
    const name = entry.packageName || entry.moduleName || entry.entryId || t('unknown')
    const related = entry.packageName ? state.entries.filter((item) => item.packageName === entry.packageName) : []
    const meta = [
      [t('fieldPackage'), entry.packageName || t('notProvided')],
      [t('fieldModule'), entry.moduleName || t('notProvided')],
      [t('fieldVersion'), entry.packageVersion || t('notProvided')],
      [t('fieldEntryId'), entry.entryId || t('notProvided')],
      [t('fieldRuntimeId'), entry.runtimeEntryId || t('notProvided')],
      [t('fieldPhase'), phaseLabel(entry.fiberPhase, t)],
      [t('fieldType'), entry.isDshPlugin ? t('typeDsh') : t('typeBuiltin')],
    ]
    return h('div', { className: styles.detail },
      h('div', { className: styles.detailHead },
        h('button', { type: 'button', className: styles.back, onClick: () => { setSelectedId(null) } }, '← ' + t('back')),
        h('h3', { className: styles.detailTitle }, name),
      ),
      h('div', { className: styles.badges },
        entry.packageVersion ? h('span', { className: styles.version }, 'v' + entry.packageVersion) : null,
        h('span', { className: entry.enabled ? styles.badgeOn : styles.badgeOff }, entry.enabled ? t('enabled') : t('disabled')),
      ),
      h('div', { className: styles.detailSection },
        h('h4', { className: styles.detailLabel }, t('fullDescription')),
        h('p', { className: styles.detailDesc }, entry.packageDescription || t('noDescription')),
      ),
      h('dl', { className: styles.metaList },
        meta.map(([key, value]) => h('div', { key, className: styles.metaRow },
          h('dt', { className: styles.metaKey }, key),
          h('dd', { className: styles.metaValue }, value),
        )),
      ),
      h('div', { className: styles.detailActions }, switchButton(entry)),
      related.length > 1 ? h('div', { className: styles.detailSection },
        h('h4', { className: styles.detailLabel }, t('related')),
        h('ul', { className: styles.relatedList },
          related.map((item) => h('li', { key: item.entryId ?? item.runtimeEntryId, className: styles.relatedItem },
            h('button', {
              type: 'button',
              className: item.entryId === entry.entryId ? styles.relatedButton + ' ' + styles.relatedActive : styles.relatedButton,
              onClick: () => { setSelectedId(item.entryId) },
            },
              h('span', { style: { overflowWrap: 'anywhere' } }, item.entryId),
              h('span', { className: item.enabled ? styles.badgeOn : styles.badgeOff }, item.enabled ? t('enabled') : t('disabled')),
            ),
          )),
        ),
      ) : null,
    )
  }

  const listView = h('div', { className: styles.section },
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

  if (selected !== null) return renderDetail(selected)
  return listView
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
exports.__internals = { filterEntries, selectDetail, phaseLabel }

		return module.exports;
	}
});
