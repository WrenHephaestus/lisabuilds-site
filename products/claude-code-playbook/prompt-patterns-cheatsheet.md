# Prompt Patterns Cheatsheet

Patterns I actually use every day with Claude Code. Keep this open in a split pane while you work — you'll internalize them fast.

---

## Exploration & Understanding

### The Scoped Explore

I use this constantly when I've inherited a codebase or I'm touching a part of the app I haven't looked at in months.

```
Find all [pattern/concept] in the codebase. Show me what you find before making changes.
```

Some real ones from my history:

- "Find all places where we're making direct database calls outside of the repository layer. Show me the list before we fix anything."
- "Find every API endpoint that doesn't have auth middleware. List them."
- "Search for any hardcoded secrets or API keys in the codebase."

The key phrase is **"before making changes."** Without it, Claude will start fixing things as it finds them, and you lose the bird's-eye view. You want the map before you start walking.

**Watch out:** On large monorepos this can produce overwhelming output. Narrow the scope — "Find all raw SQL queries in `src/services/`" beats "Find all raw SQL queries in the codebase" when you've got 800 files.

---

### The "Teach Me"

```
Explain how [system/feature] works in this codebase.
Walk through the flow from [entry point] to [end result].
```

- "Explain how authentication works in this app. Start from the login form submission and walk through every step until the user has a valid session."
- "Explain the data flow for creating an order. From the React form to the API to the database to the confirmation email."

Great for onboarding yourself onto your own code after a two-week vacation. Also surprisingly useful right before a big refactor — making Claude narrate the current flow often reveals coupling you forgot about.

---

### The Assumption Check

This one is short. I reach for it before committing to an implementation direction.

```
I'm about to [approach]. What am I missing? What could go wrong?
```

That's it. "I'm about to add a cron job that purges unverified accounts after 48 hours. What am I missing?" Claude will flag things like "what about users mid-checkout who haven't verified yet" that you'd catch at code review but would rather catch now.

---

## Implementation

### The Scoped Task

The bread and butter. Probably 60% of my prompts look like this.

```
[Action] in [file/location]. [Constraint].
```

- "Add input validation to the signup form in `src/components/SignupForm.tsx`. Use zod, match the existing validation patterns in LoginForm."
- "Fix the race condition in `src/hooks/useData.ts`. Don't change the public API."
- "Remove the deprecated `legacyAuth` function from `src/lib/auth.ts` and update all call sites."

Location + action + constraint. No ambiguity.

---

### The Architecture Brief

I use this when the feature is big enough that jumping straight to code would be a mistake.

```
I need to build [feature]. Here's the context: [context].
Propose an implementation plan before writing any code.
Consider [constraints/tradeoffs].
```

- "I need to add real-time notifications. We're using Next.js + Supabase. Propose a plan — should we use Supabase Realtime, SSE, or WebSockets? Consider that we're on Vercel (no long-running processes)."
- "I want to add multi-tenancy to this app. Currently single-tenant with one Postgres database. Propose the approach — schema-per-tenant vs. row-level security. We have about 50 tenants expected in year one."

The magic words are **"before writing any code."** Claude defaults to building. You have to explicitly tell it to think first. The plan it produces is almost always worth the extra 30 seconds — I've caught bad architectural decisions in the proposal that would've taken an hour to undo in code.

**Don't use this when:** The task is straightforward. If you need a new CRUD endpoint and you already know the pattern, skip the planning and just use a Scoped Task. Over-planning small work is its own kind of waste.

---

### The Test-First Prompt

```
Write tests for [feature/function] first, then implement it to pass the tests.
[Describe the expected behavior.]
```

- "Write tests for a `calculatePricing()` function that handles: monthly/annual billing, quantity discounts over 10 seats, and proration for mid-cycle changes. Then implement the function."
- "Write E2E tests for the checkout flow: add item → cart → enter address → payment → confirmation. Then fix any failures."

Tests define the contract. Implementation follows naturally. I find Claude writes *better* implementations when it has the tests in front of it — it stops inventing edge cases and just handles the ones you specified.

---

### The Batch Operation

```
In every [file pattern], [change]. Here's the pattern:
[Before] → [After]
```

- "In every API route handler in `src/app/api/`, add rate limiting using the `rateLimit()` middleware from `src/lib/rate-limit.ts`. Apply it the same way it's used in `src/app/api/auth/route.ts`."
- "In every React component that uses `useState` for form data, convert to `useForm` from react-hook-form. Follow the pattern already established in `SignupForm.tsx`."

The trick is pointing at an existing example. "Follow the pattern in X" does more than three paragraphs of instructions.

**Watch out:** If the "same change" isn't actually the same across files — if some files need special handling — you'll get silent bugs. Better to do a Scoped Explore first ("show me every file that uses `useState` for form data and any quirks in each") and then batch only the straightforward ones.

---

### The Refactor Fence

When you want changes to one thing without Claude "improving" everything it touches.

```
[Task]. ONLY modify [scope]. Don't refactor, rename, or improve anything outside this scope.
```

- "Convert `UserService` from a class to plain functions. ONLY modify `src/services/user.ts` and its direct imports. Don't refactor the callers beyond updating the import syntax."
- "Add TypeScript types to `src/lib/api.ts`. ONLY add types — don't change any runtime behavior, fix lint warnings, or refactor function signatures."

Claude *wants* to help. That means it'll "fix" code style in files you didn't ask about, rename variables it thinks are unclear, add error handling to functions that were fine. The fence keeps it honest. I use this on almost every refactoring prompt.

---

### The Migration Prompt

```
Migrate from [old] to [new]. Current usage: [scope].
Maintain identical behavior — this is a swap, not a rewrite.
```

- "Migrate from Moment.js to date-fns. Moment is used in 12 files (search for `import moment`). Every date operation should produce identical results."
- "Migrate from Express to Hono. Keep every route handler's behavior identical. Start with `src/routes/auth.ts` so I can verify the pattern before you do the rest."

**"Identical behavior"** is the load-bearing phrase. Without it, Claude treats a migration as an opportunity to redesign. The "start with one file" variant is something I learned the hard way — let Claude migrate one file, verify it's right, then let it loose on the rest.

**Watch out:** Even with "identical behavior," watch for subtle differences in how libraries handle edge cases. Moment's `.endOf('month')` and date-fns's `endOfMonth()` can differ on timezone handling. Run your tests after each file, not at the end.

---

### The Incremental Build

I reach for this when a feature is complex enough that I don't want Claude to try to build the whole thing at once.

```
Build [feature] in steps. After each step, stop and show me what you've done.
Step 1: [first piece]
Step 2: [second piece]
...
```

- "Build the Stripe integration in steps. After each step, stop and show me what you've done. Step 1: Set up the webhook handler and verify signatures. Step 2: Handle `checkout.session.completed`. Step 3: Handle subscription lifecycle events."

This keeps you in the loop at each stage. If step 1 goes sideways, you haven't wasted time on steps 2-4.

**Don't use this when:** You've already described the feature precisely enough that Claude can nail it in one shot. Unnecessary checkpoints just slow you down.

---

## Debugging

### The Debug Collaboration

```
[Symptom]. I've tried [what you've tried]. Relevant files: [files].
Investigate and explain what's happening before suggesting a fix.
```

- "The Stripe webhook handler returns 200 but the subscription status never updates in our database. I've verified the webhook signature is correct and events are reaching the handler. Look at `src/api/webhooks/stripe.ts` and `src/services/billing.ts`."
- "Users are getting logged out randomly after deploying the new auth changes. Session cookie is set correctly. Look at `src/middleware/auth.ts` and `src/lib/session.ts`."

The part that matters is **telling Claude what you've already eliminated**. Otherwise it'll spend its first response suggesting you check the exact thing you already checked. "I've verified X" saves a whole round trip.

---

### The Reproduce-First

Short and effective.

```
This test is failing: [test name/output]. Reproduce the failure, explain why it's happening, then fix it.
```

That's the whole pattern. Asking Claude to *reproduce* first means it actually reads the test and understands the assertion before reaching for a fix. Without "reproduce," it tends to guess from the error message alone and sometimes "fixes" things by making the test less strict.

---

## Review & Quality

### The PR Prep

I run this before every PR. It's a ritual at this point.

```
Review my staged changes. Check for:
- Bugs or logic errors
- Security issues
- Missing error handling
- Leftover debug code
- Inconsistencies with existing patterns
Don't make changes — just report what you find.
```

**"Don't make changes"** is critical. Without it, Claude will start fixing what it finds, which muddles your diff and sometimes introduces new issues. Get the report, then decide what to address.

---

### The Consistency Check

```
Compare how [pattern] is implemented across [these files]. Flag any inconsistencies.
```

- "Compare how error handling is done across all route handlers in `src/app/api/`. Flag any that don't follow the standard pattern."
- "Compare the prop interfaces for all form components. Flag any that accept the same concept under different names."

I use this when a codebase has grown organically and things have drifted. It's like a code review but for patterns instead of individual changes.

---

### The "Before You're Done" Checklist

Tack this onto the end of any implementation prompt when the stakes are high:

```
Before you're done, verify:
- [ ] No TypeScript errors
- [ ] Existing tests still pass
- [ ] No console.logs or debug artifacts left behind
- [ ] Error cases are handled, not just the happy path
```

Short, but it catches an embarrassing number of things.

---

## Anti-Patterns to Avoid

| Don't | Do Instead |
|-------|------------|
| "Make this better" | "Reduce the time complexity of `processItems()` — it's O(n²) and we're hitting 10k items" |
| "Fix the bugs" | "The checkout fails when the cart has more than 99 items. Reproduce and fix." |
| "Refactor everything" | "Extract the validation logic from `handleSubmit` into a separate `validateOrder()` function" |
| "Build me a feature" (no context) | "Add email notifications for order status changes. We use Resend. Template files are in `src/emails/`." |
| Long messages with buried instructions | Lead with the action. Context after. |
| Repeating yourself across prompts | Put it in CLAUDE.md once and stop repeating it. |

---

## The Meta-Pattern

Every good prompt has at most three things:

1. **Where** — specific files or scope
2. **What** — specific action
3. **Boundaries** — what NOT to do or change

You don't always need all three. "Explain how auth works" only has a what. "Fix the bug in `cart.ts`, don't touch the pricing logic" has all three. Match the precision to the task.

The prompts that go wrong are almost always missing boundaries. Claude is eager. Fences are your friend.

---

*Built by Lisa*
