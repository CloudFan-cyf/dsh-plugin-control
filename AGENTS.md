# AGENTS.md

## 项目背景

本仓库是 DeepSeek Harness（DSH）Web GUI 的一个独立插件：`@cloudfan-cyf/dsh-plugin-control`。

目标是弥补官方插件 UI 在“直接掌控插件开关与版本信息”上的不足：

- 在设置页新增一级区块「插件控制」。
- 以卡片列表聚合展示当前 web profile 中所有 Loader 插件条目。
- 每张卡片显示：名称、版本、简述、启用状态。
- 提供在线启用/停用开关。

## 运行形态

- DSH 通过 profile 组合加载插件：本包声明 `dsh.bundle.patch`，经 `dsh plugin --profile web add <spec>` 安装后会自动进入 `dsh.profile.bundles`。
- Host 半载入 `lib/index.js`，Browser 半载入 `lib/client.js`。
- 插件入口在设置页：注册 `settings.section` 槽位，`id: "plugin-control"`，`order: 120`。

## 核心机制

- **列表来源**：`ctx.loader.entries()`（非 group 条目），按 Loader 顺序读取。
- **元数据来源**：`<profileDir>/node_modules/<pkg>/package.json` 与 `$DSH_HOME/profiles/node_modules/<pkg>/package.json` 中的 `version` / `description` / `dsh`。
- **开关持久化**：改写 `~/.dsh/profiles/web/cordis.patch.yml`，写入/更新 `{ id: <entryId>, disabled: true|false }`。
- **热生效**：依赖 DSH 现有的 `watchUserPatches` HMR watcher；切换后由服务端有界轮询 `ctx.loader.entries()` 确认状态，最多 10 秒。
- **安全**：HTTP API 仅允许 loopback + 同源请求；路径前缀 `/api/dsh-plugin-control`。

## 关键约束

- 只使用官方 NPM SDK 和公开 DSH 行为，**不修改 DSH 源码**。
- 不发布 npm；优先通过 GitHub URL 或 `link:` 安装。
- 不得在开发过程中重启当前 3080 GUI 或把它替换掉；验证时使用**不同端口**的临时实例，并验证后立即终止。
- 保护核心基础设施条目与本插件自身，禁止被 GUI 关闭（见 `src/plugin-list.js` 的 `PROTECTED_ENTRY_IDS`）。
- 客户端 bundle 必须符合 `window.__ModuleLoader__.load({ id, factory })` 格式。
- `lib/` 由 `pnpm build` 生成，但需要提交到 Git，保证 `link:` 安装后无需构建即可运行。

## 目录结构

```text
src/
  index.js          Host 插件入口（mountOnce、路由注册）
  routes.js         loopback HTTP 路由与切换逻辑
  plugin-list.js    Loader 条目枚举、包元数据解析、保护集
  patch-store.js    cordis.patch.yml 解析/序列化/切换
  client.js         Browser bundle factory body
scripts/build.mjs   生成 lib/，并将 client.js 包成 ModuleLoader 外壳
test/               Node 内置 test runner 的单元测试
lib/                构建产物（提交）
PLAN.md             开发计划与进度
```

## 常用命令

```sh
cd "D:/Github projects/dsh-dev/dsh-plugin-control"
pnpm install
pnpm build
pnpm test

# 本地安装到 web profile（在仓库父目录执行）
cd "D:/Github projects/dsh-dev"
dsh plugin --profile web add link:./dsh-plugin-control
dsh --profile web --dump-config | grep -A3 plugin-control
```

## 完成定义

- 单元测试通过，`dsh --profile web --dump-config` 出现 `plugin-control`。
- 设置页「插件控制」可用，卡片显示名称/版本/简介/状态。
- 开关能热更新 `cordis.patch.yml` 且列表状态同步。
- 本插件与核心条目不可关闭；API 仅 loopback 可访问。
- GitHub 仓库公开并添加 topics。
