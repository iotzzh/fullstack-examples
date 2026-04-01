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

### Docker 构建（阿里云流水线 / 国内网络）

根目录 `Dockerfile` 默认使用 **`registry.cn-hangzhou.aliyuncs.com/library/node:20-alpine`**，避免从 `docker.io` 拉取 `node` 镜像超时。若在可直连 Docker Hub 的环境构建，可显式指定：

```bash
docker build --build-arg NODE_IMAGE=node:20-alpine -t your-image:tag .
```

## 文档

- 架构说明见：`docs/architecture.md`
