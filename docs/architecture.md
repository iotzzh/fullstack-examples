# 项目架构说明

## 目标

- 前后端分离，统一工作区管理（Monorepo）
- 后端采用 NestJS 分层与模块化组织
- 数据层统一走 Prisma，便于迁移与类型安全
- 预留 `packages/` 用于共享类型/工具（可按需引入）

## Monorepo 结构与职责

### `apps/web`（前端）

- 技术栈：Vue 3 + Vite + Element Plus
- 职责：
  - 页面路由、状态管理（按需）
  - UI 组件与业务组件
  - 通过 HTTP 调用后端 API（统一封装）

建议目录（生成后可按需调整）：

- `src/`
  - `main.ts`：入口
  - `App.vue`：根组件
  - `api/`：接口封装（baseURL、拦截器、错误处理）
  - `pages/`：页面（路由视角）
  - `components/`：可复用组件

### `apps/api`（后端）

- 技术栈：NestJS + Prisma
- 职责：
  - HTTP API
  - 领域模块（module/service/controller）
  - 数据访问（Prisma Client）
  - 校验、鉴权、异常与日志（按需）

建议目录：

- `src/`
  - `app.module.ts`：应用根模块
  - `modules/*`：业务模块（推荐每个领域一个模块目录）
  - `prisma/`：PrismaService 与相关封装（可选）
- `prisma/`
  - `schema.prisma`：数据模型
  - `migrations/`：迁移历史

## 环境变量与配置

- 后端以 `.env` 管理 `DATABASE_URL`、服务端口等
- 前端以 `.env.*` 管理 `VITE_API_BASE_URL`
- 仓库仅提交 `.env.example`，不提交真实 `.env`

## 数据流（典型请求）

1. 前端调用 `apps/web` 的 API 封装（例如 `GET /health`）
2. 请求到达 `apps/api` Controller
3. Controller 调用 Service
4. Service 通过 Prisma 访问数据库
5. 返回 DTO/JSON 给前端

## 约定（建议）

- **接口分层**：Controller（协议/校验） → Service（业务） → Prisma（数据）
- **错误处理**：统一异常过滤器（可后续补）
- **DTO 与校验**：使用 `class-validator` / `class-transformer`
- **版本控制**：API 可在路径或 header 做版本化（可选）
