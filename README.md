# 全栈项目示例（Monorepo）

- 前端：Vue 3 + Vite + Element Plus（`apps/web`）
- 后端：Node.js + NestJS + Prisma（`apps/api`）

## 目录结构

```text
.
├─ apps/
│  ├─ web/                  # 前端（Vue3 + Element Plus）
│  └─ api/                  # 后端（NestJS + Prisma）
├─ packages/                # 可选：共享包（utils、types、ui 等）
└─ docs/
   └─ architecture.md       # 架构文档（前后端分层、目录约定、数据流）
```

## 快速开始

### 安装依赖

```bash
pnpm -v
pnpm install
```

### 初始化数据库（默认 SQLite）

```bash
pnpm db:generate
pnpm db:migrate
```

### 开发启动

```bash
pnpm dev
```

## 文档

- 架构说明见：`docs/architecture.md`
