# AGENTS.md

## Cursor Cloud specific instructions

### Overview

n8n is a workflow automation platform — a TypeScript monorepo managed by **pnpm workspaces** with **Turbo** build orchestration. The two main services are:

| Service | Port | Description |
|---------|------|-------------|
| Backend (CLI) | 5678 | Express API + workflow engine (`packages/cli`) |
| Frontend (Editor UI) | 8080 (dev) / served from backend (prod) | Vue 3 editor (`packages/frontend/editor-ui`) |

SQLite is the default database — no external DB service needed for local development.

### Running the application

- **Production mode** (uses pre-built assets): `pnpm start` — serves on `:5678`
- **Development mode** (hot-reload): `pnpm dev` — runs all packages in watch mode. Can be resource-intensive; consider `pnpm dev:be` (backend-only) or `pnpm dev:fe` (frontend-only) for focused work.
- The `pnpm dev` command uses `turbo run dev --parallel` which starts ~40+ watchers. On first run after a fresh build, the backend (`n8n:dev`) may take 2-3 minutes to start because all dependency packages must finish compiling first.
- In resource-constrained environments (like Cloud VMs), prefer `pnpm start` for verification — it starts in ~5 seconds with pre-built assets.

### Build, lint, test, typecheck

See `CLAUDE.md` for canonical commands. Key reminders:
- `pnpm build > build.log 2>&1` — always redirect build output.
- `pnpm lint`, `pnpm typecheck` — run from repo root for full check, or from a specific package directory for that package only.
- `pnpm test` — runs all tests; `pnpm test` inside a package directory runs only that package's tests.
- Tests in `packages/workflow` are a good quick smoke check (1400+ tests, runs in ~6s).

### Gotchas

- On first launch, n8n runs all SQLite migrations automatically (~100 migrations). This is normal and takes a few seconds.
- After `pnpm install`, you must run `pnpm build` before `pnpm start` — the CLI serves pre-built frontend assets.
- The `pnpm dev` command may appear to hang if terminal output is buffered. Check port 5678 availability to confirm the backend is up.
- The owner account setup endpoint is `POST /rest/owner/setup` with fields `email`, `firstName`, `lastName`, `password`. The login endpoint is `POST /rest/login` with field `emailOrLdapLoginId` (not `email`).
- The `packages/core` test suite has 2 pre-existing test failures related to `HttpsAgent.options` assertions — these are not caused by environment setup.
- `lefthook.yml` defines pre-commit hooks for biome, prettier, stylelint, and actionlint. These run automatically on commit via `lefthook`.
