# dsh-plugin-control

DSH Web GUI 插件控制中心：以卡片列表聚合展示当前 profile 已安装插件，显示名称、版本与简介，并提供在线启用/停用开关。

## 功能

- 设置页新增一级区块「插件控制」。
- 卡片展示每个 Loader 插件条目：名称、版本、简介、启用状态。
- 支持搜索与「仅显示已安装插件」过滤。
- 在线开关直接写入 profile 层 `cordis.patch.yml`，由 DSH 现有 HMR watcher 热生效，无需手动重启。
- 核心基础设施条目与本插件自身不可关闭，避免误操作。

## 安装

### 从 GitHub 仓库安装

```sh
dsh plugin --profile web add https://github.com/CloudFan-cyf/dsh-plugin-control
```

### 本地开发安装

```sh
git clone https://github.com/CloudFan-cyf/dsh-plugin-control
cd dsh-plugin-control
pnpm install
pnpm build

# 在仓库父目录执行，link 安装到 web profile
dsh plugin --profile web add link:./dsh-plugin-control
```

> 首次安装后需要重启 `dsh web` 才会加载新 bundle；后续开关操作依赖 HMR，不需要重启。

## 使用

1. 重启 `dsh web` 后打开 设置 → 插件控制。
2. 卡片显示插件名称、版本、简介与启用状态。
3. 点击开关即可启用/停用插件；状态写入 `~/.dsh/profiles/web/cordis.patch.yml`。

## 工作原理

- 列表来自 `ctx.loader.entries()`。
- 版本与简介读取 `<profileDir>/node_modules/<pkg>/package.json` 与 `$DSH_HOME/profiles/node_modules/<pkg>/package.json`。
- 切换写 profile 层 patch，并由现有 `watchUserPatches` 热重载。

## 安全

- API 仅允许 loopback + 同源请求，路径前缀 `/api/dsh-plugin-control`。
- 首次改写 patch 文件前会备份为 `cordis.patch.yml.dsh-plugin-control.bak`。

## 已知限制

- 只管理 profile 层 `cordis.patch.yml`；若 home 层 `~/.dsh/cordis.patch.yml` 存在同名补丁，需要用户自行处理。
- 改写 patch 文件时可能规范化 YAML 注释（语义保留，注释可能丢失）。

## 开发

```sh
pnpm install
pnpm build
pnpm test
```

- 源码在 `src/`，构建产物在 `lib/`（提交到 Git）。
- `lib/client.js` 由 `scripts/build.mjs` 生成，必须符合 `window.__ModuleLoader__.load` 格式。
