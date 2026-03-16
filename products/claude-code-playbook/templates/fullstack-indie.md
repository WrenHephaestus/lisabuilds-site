# [EDIT: Project Name]

[EDIT: One-liner — what does this product do and for whom?]

## I'm a Solo Builder

I'm shipping this alone, so Claude, keep these priorities straight:
1. **Working > Perfect.** Ship it, then iterate.
2. **Simple > Clever.** I need to maintain this at 2am when something breaks.
3. **Fast > Thorough.** If there's a library that does 80% of the job, use it.
4. **Fewer files > More files.** Don't abstract until it hurts.

## Stack

- **Frontend:** [EDIT: Next.js / Remix / SvelteKit / Nuxt]
- **Backend:** [EDIT: same framework API routes / separate FastAPI / Express]
- **Database:** [EDIT: Supabase / PlanetScale / Turso / Postgres on Fly.io]
- **Auth:** [EDIT: Clerk / Supabase Auth / NextAuth / Lucia]
- **Payments:** [EDIT: Stripe / Lemon Squeezy]
- **Email:** [EDIT: Resend / Postmark / SendGrid]
- **Hosting:** [EDIT: Vercel / Cloudflare / Fly.io / Railway]
- **Monitoring:** [EDIT: Sentry / none yet]
- **Analytics:** [EDIT: Plausible / PostHog / none yet]

## Project Structure

```
[EDIT: your actual structure — here's a common pattern]
├── src/
│   ├── app/                 # Pages/routes
│   ├── components/          # UI components (flat, no nesting hell)
│   ├── lib/                 # Business logic, API clients, utils
│   │   ├── db.ts            # Database client
│   │   ├── auth.ts          # Auth helpers
│   │   ├── stripe.ts        # Payment logic
│   │   └── email.ts         # Email sending
│   ├── hooks/               # Custom hooks
│   └── types.ts             # All types in one file until it's too big
├── public/
├── prisma/ (or drizzle/)
└── package.json
```

## Conventions

### The Solo Builder Rules
- One component per file, but keep files close together — don't spread related things across 5 directories
- Types go in `types.ts` until that file hits 200 lines, then split by domain
- No abstraction until the third copy-paste. Two is fine. Three means refactor.
- Comments explain *why*, not *what*. If the code needs a *what* comment, the code is too clever.

### Naming
- Name things what they are. `UserDashboard`, not `MainContent`. `createSubscription`, not `handleAction`.
- Files match their primary export: `UserDashboard.tsx` exports `UserDashboard`

### State & Data
- Server-side by default. Client state only for UI interactions (modals, forms, optimistic updates).
- Database is the source of truth. Don't cache things in client state that should be re-fetched.
- [EDIT: SWR / React Query / server components] for data fetching

### Payments
- Stripe webhook handler is critical path — test it thoroughly
- Always verify webhook signatures
- Store subscription status in your database, synced via webhooks
- Never trust client-side payment status

### Auth
- Protect API routes and server actions — don't rely only on UI-level auth checks
- Use middleware for auth on route groups
- [EDIT: specific auth patterns for your setup]

## Key Commands

```bash
[EDIT: your actual commands]
dev:       npm run dev
build:     npm run build
test:      npm test
db:push:   npx prisma db push
db:studio: npx prisma studio
stripe:    stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Current Status

[EDIT: This is the most important section — update it as you work]

### What I'm building right now:
- [EDIT: current feature or milestone]

### What's live:
- [EDIT: deployed features]

### Known jank:
- [EDIT: tech debt, known bugs, shortcuts taken]

### Upcoming:
- [EDIT: next 2-3 features or tasks]

## Do NOT

- Don't over-engineer. If I have 0 users, I don't need a microservices architecture.
- Don't add error tracking, analytics, or monitoring until I ask for it.
- Don't refactor working code unless I specifically ask.
- Don't add types to code you didn't write in this session.
- Don't install new dependencies without mentioning it — I want to keep the bundle small.
- [EDIT: your personal guardrails]
