# Memory Management Guide

How to make Claude Code remember things between sessions. This is the thing that turns "helpful autocomplete" into something that actually knows your project.

---

## The Before/After That Changed Everything

Here's what happens without memory. You start a session:

> "Add a retry mechanism to the payment webhook handler"

Claude reads your codebase, makes reasonable guesses about your architecture, and produces... something. Maybe it puts retry logic in the route handler because it doesn't know you have a service layer convention. Maybe it uses `requests` because it doesn't know you're on `httpx`. Maybe it creates a new file when you already have a `utils/resilience.py` that handles retries project-wide.

You spend 20 minutes correcting things that shouldn't need correcting.

Now here's the same request with a well-maintained MEMORY.md and CLAUDE.md:

> "Add a retry mechanism to the payment webhook handler"

Claude reads your memory files and already knows:
- You use a router → service → repository architecture (CLAUDE.md)
- The webhook handler is at `src/api/webhooks/stripe.py` and calls `src/services/billing.py` (MEMORY.md)
- You hit a flaky Stripe API timeout issue two weeks ago that took an hour to debug (debugging.md)
- You prefer exponential backoff with jitter because you learned the hard way about thundering herds (MEMORY.md, Key Decisions)

First attempt is usable. Sometimes it's exactly right.

The difference isn't magic. It's just context that doesn't evaporate.

---

## Where Memory Lives

Claude Code stores persistent memory at:
```
~/.claude/projects/[encoded-project-path]/memory/
```

Files here survive between sessions. When you start a new session in the same project, Claude reads them and picks up where you left off.

There are three layers, and they work differently.

**CLAUDE.md** — your project's instruction manual. Lives in the project root. Loaded every session, automatically. This is where conventions, structure, and rules go. Things that are always true.

**MEMORY.md** — the session bridge. Lives in the memory directory above. Also loaded every session automatically. This is where *current state* goes. What you're working on, what you decided last week, what's broken. Keep it concise — shorter is better, and very long files may get truncated.

**Topic files** — deep reference. Also in the memory directory, named by topic (`debugging.md`, `api-quirks.md`, whatever). These are *not* auto-loaded. Claude reads them when they're relevant. This is where detailed notes live so they don't bloat your MEMORY.md.

---

## What Goes Where

### MEMORY.md — keep this lean

```markdown
# Project Memory

## Current Status
- Working on: [current feature/task]
- Blocked on: [blockers, if any]
- Last session: [brief summary]

## Key Decisions
- [Decision]: [brief reasoning]

## Architecture Notes
- [Brief pointers — link to topic files for details]

## Watch Out For
- [Gotcha or recurring issue]
```

That's it. Resist the urge to put everything here. If a section is growing past a dozen lines, it probably wants its own topic file.

### Topic files — as detailed as you need

Some that tend to earn their keep:
- `debugging.md` — solutions to problems that took real time to figure out
- `architecture.md` — design decisions and *why* you made them
- `api-quirks.md` — third-party API surprises ("Stripe retries webhooks for 72 hours", "OpenAI returns 429s with no Retry-After header sometimes")
- `patterns.md` — code patterns that work well in this project specifically

---

## What to Save (and What to Skip)

**Worth saving:**
- Patterns confirmed across multiple sessions — not hunches from one observation
- Decisions with reasoning ("chose SQLite for dev because the team is one person and PostgreSQL setup was burning half a session")
- Bug solutions that took real debugging time
- User preferences ("always use bun", "tabs not spaces", "don't touch the legacy auth module")
- External system weirdness you had to discover the hard way

**Skip these:**
- Anything that duplicates what's already in CLAUDE.md
- Speculative conclusions from a single data point
- Long code blocks — just reference the file path
- Anything changing faster than you'll remember to update it

The one exception: temporary task state ("currently debugging the login flow") *does* belong in MEMORY.md's Current Status section. Just update or remove it next session.

---

## The Discipline Part

This is where most people fall off. Memory is only useful if it's maintained.

End of a productive session? Update the Current Status section. Solved a weird bug? Add it to debugging.md while the pain is fresh. Discovered a memory entry that's just... wrong? **Delete or correct it immediately.** Stale memories are actively worse than no memories. Claude will confidently follow outdated instructions right off a cliff.

Every few sessions, scan your memory files. If you haven't referenced something in a while, consider cutting it. Tight memory beats comprehensive memory.

---

## Handing Off Between Sessions

When you're stopping mid-task, write your MEMORY.md like a note to a coworker who's picking up your exact seat tomorrow. They're smart but they know nothing about what you did today.

```markdown
## Current Status
- **Working on:** Stripe webhook handler for subscription renewals
- **Progress:** Handler receives events, signature verification works.
  Currently failing on `customer.subscription.updated` — the plan change
  logic in `src/services/billing.ts:handlePlanChange()` doesn't account
  for mid-cycle upgrades.
- **Next step:** Fix handlePlanChange to prorate, then write tests
- **Key files:**
  - `src/api/webhooks/stripe.ts` (handler)
  - `src/services/billing.ts` (business logic)
  - `tests/billing.test.ts` (tests — 3 failing)
```

A fresh session reading this knows what's happening, where to look, and what to do next. No archaeology required.

---

## MEMORY.md Full Template

```markdown
# [Project Name] — Memory

## Current Status
- **Working on:** [what you're building right now]
- **Phase:** [planning / building / testing / shipping]
- **Last session:** [1-2 sentence summary]

## Key Decisions
- [YYYY-MM-DD] [Decision] — [why]

## Patterns & Conventions
- [Things discovered through usage, not documented elsewhere]

## Watch Out For
- [Gotchas, recurring issues, things that bite]

## Reference Files
- See `debugging.md` for [topic]
- See `architecture.md` for [topic]
```

---

*Built by Lisa*
