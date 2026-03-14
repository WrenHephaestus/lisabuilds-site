# Newsletter Issue #004 -- Three Prompt Patterns

**Subject line options:**
1. Three prompts I use every single day. They're boring. They work.
2. Stop telling Claude "make this better." Try this instead.
3. The prompt pattern that stopped me from wasting 20 minutes a session.

**Preview text:** It's not about sounding smart. It's about being specific.

---

Hey, Lisa here. 👋

I promised you prompt patterns. Here they are.

I keep a cheatsheet of prompt structures I use with Claude Code. Not "magic words" or "unlock the hidden potential of AI" garbage. Just structures that consistently get better output than whatever I'd type off the cuff. After months of daily use, three patterns account for probably 80% of my good interactions.

They're boring. They work.

---

## 🔧 The Refactor Fence

This one saved me more wasted time than anything else on the list.

You know the problem. You ask Claude to fix a bug in one function, and it fixes the bug... plus refactors the neighboring function "for consistency," adds type annotations to the whole file, pulls in a utility library, and rewrites your error handling. You asked for a bug fix. You got a home renovation.

The pattern:

```
[Task]. ONLY modify [scope]. Don't refactor, rename, or improve anything outside this scope.
```

Real example from last week:

```
Add TypeScript types to src/lib/api.ts.
ONLY add types.
Don't change any runtime behavior, fix lint warnings, or refactor function signatures.
```

Another one:

```
Fix the null pointer in handleCheckout().
ONLY modify src/services/checkout.ts.
Don't refactor the callers, don't update the tests, don't improve
error handling in neighboring functions.
```

Claude genuinely wants to help, and its definition of "help" is broader than yours. The Refactor Fence keeps it honest. I use some version of this on almost every editing prompt now.

The key phrase is "ONLY modify [scope]." Three words. Saves you from reviewing a diff full of surprises.

---

## 🔍 The Scoped Explore

This one changed how I approach unfamiliar code.

When you've inherited a codebase, or you're touching a module you haven't looked at in months, the temptation is to jump straight to fixing things. Don't. Map the territory first.

```
Find all [pattern] in the codebase. Show me what you find before making changes.
```

Some real ones from my history:

- "Find every API endpoint that doesn't have auth middleware. List them. Don't fix anything yet."
- "Find all places where we're making raw database calls outside the repository layer. Show me the list."
- "Search for any hardcoded secrets or API keys. Just the list, no fixes."

The magic words are **"before making changes."** Without those three words, Claude starts fixing things as it discovers them. You lose the bird's-eye view. You want the map before you start walking.

I use this as my first prompt in probably a third of my sessions. Especially powerful after you've been away from a project. "Find all TODO comments. Show me, don't touch them." Instant orientation.

One gotcha: on large monorepos, this can produce a LOT of output. Narrow the scope. "Find all raw SQL in `src/services/`" beats "find all raw SQL in the codebase" when your repo has 800 files.

---

## 💡 The Debug Collaboration

This is for when something is broken and you've already spent 20 minutes staring at it.

```
[Symptom]. I've tried [what you've tried]. Relevant files: [files].
Investigate and explain what's happening before suggesting a fix.
```

Real example:

```
The Stripe webhook handler returns 200 but the subscription
status never updates in our database. I've verified the webhook
signature is correct and events are reaching the handler.
Look at src/api/webhooks/stripe.ts and src/services/billing.ts.
```

Two things make this work.

First, **telling Claude what you've already eliminated.** Without "I've verified the webhook signature is correct," Claude's first response would be "have you checked the webhook signature?" You already did that. Saying so skips the round trip. Every failed hypothesis you share saves a full back-and-forth.

Second, **"explain before suggesting a fix."** Without this, Claude guesses from the error message and starts writing code that "should" work. With it, Claude traces the logic, builds a model of what's happening, then suggests a fix that addresses the root cause instead of the symptom.

The difference between a 10-minute debug session and a 45-minute one is often just this pattern.

---

## The Thing They All Share

All three patterns have the same DNA. Every good prompt has at most three things:

1. **Where** (specific files or scope)
2. **What** (specific action)
3. **Boundaries** (what NOT to do)

You don't always need all three. "Explain how auth works" only has a What. "Fix the bug in cart.ts, don't touch the pricing logic" has all three. Match the precision to the task.

The prompts that go wrong are almost always missing the boundaries. Claude is eager. Fences help.

I have a full cheatsheet with 13 of these patterns, organized by situation (exploring code, building features, debugging, reviewing PRs). It's in **The Claude Code Playbook** along with 12 CLAUDE.md templates and workflow guides. https://lisahephaestus.gumroad.com/l/zhmvdh

---

Next week: **What to do when your AI tool goes down mid-session.** Two outages in ten days taught me something about building workflows that don't have a single point of failure.

Ship it. 🚀

-- Lisa

---

## Publishing Notes for Shane

- **Send when:** 1 week after the previous issue
- **CTA:** Link to The Claude Code Playbook on Gumroad
- **Flexibility note:** This issue works as #003 OR #004, depending on whether you sent the Anthropic/Pentagon piece. If the war piece was held, this follows naturally from issue #002's memory system content. If the war piece was sent, this is the practical palette-cleanser. Either way, the opening doesn't reference a specific prior issue, so it works in both slots.
