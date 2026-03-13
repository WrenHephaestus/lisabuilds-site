# Newsletter Issue #002 -- The Memory System

**Subject line options:**
1. Claude Code remembers things between sessions. Are you using this?
2. Your AI forgets everything. Unless you do this.
3. The file that makes Claude Code feel like it actually knows your project.

**Preview text:** It's not magic. It's good note-taking. But it feels like magic.

---

Hey, Lisa here. 👋

Last week I talked about CLAUDE.md, the config file that tells Claude about your project. This week I want to show you the thing that sits alongside it and does something most people don't expect:

**Claude Code can remember things between sessions.**

Not through some mysterious memory system. Through a dead-simple file directory that you control.

---

## 🔧 The Memory Directory

Claude Code keeps a persistent memory folder at:

```
~/.claude/projects/[your-project-path]/memory/
```

Files in here survive between sessions. The important one is `MEMORY.md`. It gets loaded into context automatically when you start working.

Think of it as a note that past-you leaves for future-you (where "future you" is a completely fresh Claude session that has zero context about what happened yesterday).

### What to put in MEMORY.md:

```markdown
# Project Memory

## Current Status
- Working on: Stripe subscription renewal logic
- Last session: Webhook handler works, proration logic is broken
- Next step: Fix handlePlanChange() for mid-cycle upgrades
- Key files: src/services/billing.ts, tests/billing.test.ts (3 failing)

## Key Decisions
- Went with row-level security over schema-per-tenant (2024-01-15)
- Chose Resend over SendGrid for email (simpler API, good enough for our volume)

## Watch Out For
- The Stripe test clock API has a 10-second delay before events fire
- UserService.delete() cascades to subscriptions, careful in tests
```

### Separate topic files for deeper stuff:

When something needs more detail than a few lines, break it out:
- `debugging.md` for hard bugs you've already solved
- `api-quirks.md` for external service gotchas
- `architecture.md` for design decisions with full reasoning

Reference them from MEMORY.md: *"See debugging.md for the Redis connection pool issue."*

---

## The Session Handoff

This is the killer use case. You're mid-task, you need to stop for the day.

Before you close out, just say:

> "Update MEMORY.md with where we are so the next session can pick up here."

Claude writes a status update with context, progress, next steps, and the relevant file paths. Tomorrow, when you spin up a fresh session, it reads that note and says something like "Looks like last session we were debugging the subscription renewal. The three failing tests are in billing.test.ts. Want to continue?"

It's not magic. It's good note-taking automated by your AI. But the first time it happens, it *feels* like magic.

---

## 🔍 The Full Memory Guide

I wrote a complete breakdown of the memory system: what to store vs. what to skip, templates for MEMORY.md, and a three-tier architecture for organizing your project knowledge (CLAUDE.md → MEMORY.md → topic files).

It's in **The Claude Code Playbook**, along with 12 CLAUDE.md templates and 7 workflow guides. https://zyzzy5.gumroad.com/l/zhmvdh

---

## 💡 Build This Habit

When you wrap up a working session:

1. Tell Claude: "We're done for now. Update memory with current status."
2. Claude writes the handoff note.
3. Next session starts with full context.

Three seconds of effort. Saves five minutes of re-explaining tomorrow. Compounds over weeks.

---

Next week: **Prompt patterns that actually work with Claude Code.** The cheatsheet I keep open while I work.

Ship it. 🚀

-- Lisa

---

## Publishing Notes for Shane
- **Send when:** 1 week after Issue #001
- **CTA:** Link to The Claude Code Playbook
