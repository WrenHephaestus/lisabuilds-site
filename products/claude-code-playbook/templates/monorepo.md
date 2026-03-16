# [EDIT: Project Name]

[EDIT: What this monorepo contains and why it's a monorepo]

## Stack

- **Monorepo tool:** [EDIT: Turborepo / Nx / pnpm workspaces / npm workspaces]
- **Package manager:** [EDIT: pnpm / npm / bun] (MUST use workspaces)
- **Language:** [EDIT: TypeScript throughout / mixed]
- **CI:** [EDIT: GitHub Actions / GitLab CI / CircleCI]

## Workspace Structure

```
[EDIT: project-name]/
├── apps/
│   ├── web/              # [EDIT: Next.js frontend]
│   ├── api/              # [EDIT: Express/FastAPI backend]
│   ├── mobile/           # [EDIT: React Native app]
│   └── [EDIT: others]
├── packages/
│   ├── ui/               # Shared UI component library
│   ├── config/           # Shared configs (ESLint, TypeScript, Tailwind)
│   ├── db/               # Database client and schema (shared across apps)
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Shared utility functions
├── tooling/              # Build scripts, dev tools
├── turbo.json            # [EDIT: or nx.json]
├── pnpm-workspace.yaml   # [EDIT: workspace config]
└── package.json          # Root package.json
```

## Conventions

### The Cardinal Rules of This Monorepo

1. **Packages are the API boundary.** Apps import from packages via their public exports. Never reach into package internals (`@repo/ui/src/internal/thing` = BAD).
2. **Shared code goes in packages, not duplicated across apps.** If two apps need the same thing, it belongs in a package.
3. **Each package has a single responsibility.** `@repo/ui` is UI components. `@repo/db` is database. Don't dump everything in `@repo/utils`.
4. **Dependencies are declared where they're used.** If `apps/web` uses `zod`, `zod` is in `apps/web/package.json`, not the root.

### Package Naming
- Internal packages: `@[EDIT: repo-name]/[package-name]`
- Import like: `import { Button } from "@repo/ui"`
- Every package has its own `package.json` with `name`, `exports`, and `dependencies`

### Cross-Package Changes
- When modifying a shared package, check what apps depend on it: `[EDIT: pnpm why / turbo dependents]`
- Run affected tests: `[EDIT: turbo run test --filter=...[@repo/changed-package]]`
- Build order is handled by [EDIT: Turborepo / Nx] — don't manually sequence builds

### Adding a New Package
1. Create directory in `packages/[name]/`
2. Add `package.json` with correct `name` and `exports`
3. Add `tsconfig.json` extending shared config
4. Register in workspace config if needed
5. Import from consuming apps

### Adding a New App
1. Create directory in `apps/[name]/`
2. Add framework boilerplate
3. Import shared packages as needed
4. Add build/dev/test scripts to `turbo.json` pipeline

## Key Commands

```bash
[EDIT: your actual commands]
dev:          turbo dev                    # Start all apps in dev mode
dev:web:      turbo dev --filter=web       # Start just the web app
build:        turbo build                  # Build everything
test:         turbo test                   # Test everything
test:changed: turbo test --filter=[HEAD^1] # Test only changed packages
lint:         turbo lint                   # Lint everything
add-dep:      pnpm add zod --filter=web   # Add dep to specific workspace
```

## Important Context

[EDIT: Monorepo-specific notes]
- Why this is a monorepo (shared types? shared UI? deploy together?)
- Which apps deploy independently vs. together
- CI/CD pipeline notes
- Known build order issues

## Do NOT

- Don't install dependencies in the root `package.json` unless they're truly workspace-level (turbo, husky)
- Don't import from one app to another — use packages as the intermediary
- Don't bypass the build system by importing source files across packages
- Don't modify `turbo.json` / `nx.json` pipeline without understanding the dependency graph
- [EDIT: project-specific guardrails]
