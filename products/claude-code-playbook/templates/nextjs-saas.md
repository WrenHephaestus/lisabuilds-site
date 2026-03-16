# [EDIT: Project Name]

[EDIT: One-line description of what this project does]

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** [EDIT: Tailwind CSS / CSS Modules / styled-components]
- **UI Components:** [EDIT: shadcn/ui / Radix / custom]
- **Database:** [EDIT: Postgres via Prisma / Drizzle / Supabase]
- **Auth:** [EDIT: NextAuth.js / Clerk / Supabase Auth / Lucia]
- **Payments:** [EDIT: Stripe / Lemon Squeezy / none yet]
- **Deployment:** [EDIT: Vercel / Cloudflare / self-hosted]
- **Package manager:** [EDIT: npm / pnpm / bun]

## Project Structure

```
src/
├── app/              # App Router pages and layouts
│   ├── (auth)/       # Auth-related routes (login, signup)
│   ├── (dashboard)/  # Authenticated dashboard routes
│   ├── (marketing)/  # Public marketing pages
│   ├── api/          # API routes
│   └── layout.tsx    # Root layout
├── components/
│   ├── ui/           # Reusable UI primitives
│   └── [feature]/    # Feature-specific components
├── lib/              # Utilities, clients, helpers
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── [EDIT: add any project-specific directories]
```

## Conventions

### Code Style
- Use `function` declarations for components, arrow functions for callbacks
- Prefer named exports over default exports
- Co-locate component files: `component.tsx`, `component.test.tsx`
- Server Components by default; add `"use client"` only when needed
- Use `cn()` utility for conditional classnames (if using Tailwind)

### Naming
- Components: PascalCase (`UserProfile.tsx`)
- Utilities/hooks: camelCase (`useAuth.ts`, `formatDate.ts`)
- API routes: kebab-case directories (`api/webhook-handler/route.ts`)
- Database models: PascalCase singular (`User`, `Subscription`)
- Environment variables: SCREAMING_SNAKE_CASE

### Data Fetching
- Fetch data in Server Components where possible
- Use Server Actions for mutations
- Keep API routes for webhooks and external integrations
- [EDIT: any specific data patterns for your project]

### Error Handling
- Use error boundaries (`error.tsx`) at route segment level
- Server Actions return `{ success: boolean, error?: string }` — don't throw from Server Actions, the DX is awful
- Log errors server-side, show user-friendly messages client-side

### Testing
- [EDIT: Vitest / Jest] for unit tests
- [EDIT: Playwright / Cypress] for E2E
- Test files live next to source files: `thing.test.ts`
- Run tests: `[EDIT: npm run test / pnpm test / bun test]`

## Key Commands

```bash
[EDIT: your actual commands]
dev:     npm run dev          # Start dev server
build:   npm run build        # Production build
test:    npm run test         # Run tests
lint:    npm run lint         # ESLint
db:      npx prisma studio   # Database GUI
migrate: npx prisma migrate dev  # Run migrations
```

## Important Context

[EDIT: This section is your unfair advantage. Add anything that would take Claude 10 minutes to figure out on its own:]
- Current feature being worked on
- Known tech debt or gotchas ("don't touch the legacy billing module")
- Third-party API quirks ("Stripe webhooks retry for 72 hours")
- Design system rules

## Do NOT

- Don't use `any` type — find or create the correct type
- Don't add `console.log` for debugging — use the proper logger if one exists
- Don't modify the auth flow without explicit instruction
- Don't install new dependencies without asking first
- [EDIT: project-specific guardrails]
