# Newsletter Issue #012 -- The Almost Right Problem

**Subject line options (pick one):**
1. 45% of developers are frustrated with AI code. Here's the actual fix.
2. The "almost right" problem is worse than wrong code. Here's why.
3. Your AI's code looks correct. That's the problem.

**Preview text:** Almost-right code is worse than wrong code. New data shows the trust gap is growing, and the fix isn't what you'd expect.

---

Hey! Lisa here.

I want to talk about the most expensive problem in AI-assisted development right now. It's not hallucinations. It's not context limits. It's not rate limiting.

It's code that's *almost right*.

---

## The Data

DeveloperWeek 2026 just wrapped, and Stack Overflow published a writeup that confirmed something a lot of us already felt:

**45% of developers report frustration with AI-generated code that looks correct but fails in production.**

That number landed hard for me. Not because it's surprising. Because it means the problem is getting worse.

In 2024, 31% of developers actively distrusted AI outputs. Now it's nearly half. Models are better than they've ever been. Trust is lower than it's ever been. That's not a paradox. It's a signal.

## Why "Almost Right" Is Worse Than Wrong

Wrong code is obvious. It throws errors. Tests fail. You catch it.

Almost-right code passes your glance. Maybe passes your tests too. It uses the right patterns, the right variable names, the right structure. It looks like code you would have written.

Then it breaks in production because it used a database field that was renamed six months ago. Or it handled the error path the generic way instead of the way your team decided to handle it after that incident in November. Or it imported a utility function that exists in the codebase but was deprecated and nobody deleted it yet.

The AI didn't make a mistake, exactly. It made a reasonable guess in the absence of context.

## The Context Gap

Here's the thing DeveloperWeek kept coming back to: **"AI without organizational context is useless."**

That's strong language from a developer conference. But the data backs it up. When multiple speakers independently converge on the same conclusion, you can stop calling it an opinion.

The "almost right" problem isn't a model quality problem. It's a context deficit wearing a capability mask.

Your AI writes code that's correct for *a* codebase. Not for *your* codebase. The gap between "technically correct" and "organizationally correct" is the context you haven't provided.

## What Actually Fixes This

I'm not going to pretend this is simple. But the pattern that DeveloperWeek validated, and that I see working in practice, is context injection.

That means:

**1. Project context files (like CLAUDE.md)**
Tell the AI about your architecture, your conventions, your past decisions. Not documentation. Operational context. "We use X for Y because Z happened." The AI can't read your team's memory. Give it your team's memory.

**2. Scoped, not global**
Don't dump everything. Scope your context to the task. A database migration doesn't need your frontend architecture decisions. A UI component doesn't need your deployment pipeline details. Relevance beats volume.

**3. "Don't" rules, not just "do" rules**
"Do NOT use the legacy UserService, use UserServiceV2" prevents the most common almost-right failures. The AI will reach for the thing that exists and looks right. Tell it about the things that exist but aren't right anymore.

**4. Review with context in mind**
When you review AI code, stop asking "is this correct?" Start asking "does this match how WE do things?" That shift catches the almost-right problems before they ship.

---

## 🔬 One More Thing

Geoffrey Huntley published research showing that context window quality degrades around 70-75% capacity. Even though Claude advertises a 200K token window, meaningful degradation starts around 147K-152K tokens.

That means your long sessions aren't just slower at the end. They're less precise. The "almost right" problem gets worse the longer your session runs.

The fix: shorter sessions with strong context files. Let the CLAUDE.md carry the knowledge so the context window carries the current task.

---

I wrote about the hidden productivity tax of AI tools last issue. This is the flip side: the hidden *quality* tax. The cost of almost-right code isn't measured in time. It's measured in trust. And right now, trust is going in the wrong direction.

The tools are getting better. Our approach to using them needs to keep up.

Until next time,
Lisa

*P.S. If your CLAUDE.md is longer than 200 lines and you're not sure what's actually useful in it, that's a problem I can help with. Reply and tell me what's not working.*

---

**Sources cited:**
- Stack Overflow: "DeveloperWeek 2026: Making AI tools that are actually good" (stackoverflow.blog, March 5, 2026)
- Geoffrey Huntley: context window degradation research (147K-152K token threshold)
