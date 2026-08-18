# dsh-plugin-control 开发计划与进度

> 状态图例：`[ ]` 未开始 · `[~]` 进行中 · `[x]` 已完成

## 进度总览

- [x] 仓库脚手架（package.json、cordis.patch.yml、.gitignore、LICENSE、AGENTS.md）
- [x] 计划文档 PLAN.md
- [x] patch-store 模块（`cordis.patch.yml` 解析/序列化/切换）
- [x] plugin-list 模块（Loader 条目枚举与包元数据解析）
- [x] routes 模块（loopback HTTP API 与切换逻辑）
- [x] Host 入口 `src/index.js`
- [x] Browser bundle `src/client.js`
- [x] `scripts/build.mjs` 构建脚本
- [x] 单元测试 `test/patch-store.test.mjs`
- [x] 安装依赖、构建、跑测试（7/7 通过）
- [ ] 安装到 web profile 并验证 dump-config
- [ ] 临时第二实例 API 冒烟测试
- [ ] Git 提交、创建 GitHub 仓库、推送、添加 topics
- [ ] 最终人工验收（当前 GUI 重启后）

## 关键接口

### Host HTTP API

- `GET /api/dsh-plugin-control/plugins` → `{ ok, entries[] }`
- `POST /api/dsh-plugin-control/toggle` → body `{ entryId, enabled }` → `{ ok, applied, entries[] }`

### 设置页槽位

- `settings.section`，id `plugin-control`，order `120`，locale namespace `plugin-control`。

## 备注

- 切换状态保存于 profile 层 `cordis.patch.yml`，不修改 DSH 源码。
- 首次改写前备份为 `cordis.patch.yml.dsh-plugin-control.bak`。
