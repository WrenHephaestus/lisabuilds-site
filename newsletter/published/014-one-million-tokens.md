# Newsletter Issue #014 -- One Million Tokens and the Question Nobody's Asking

**Subject line options (pick one):**
1. Claude just gave you 1M tokens. That's not the interesting part.
2. 1M context window is live. Here's what actually changes (and what doesn't).
3. You just got 5x more context. The hard problem is still the same.

**Preview text:** Anthropic just made 1M context GA for Opus 4.6 and Sonnet 4.6. Everyone's celebrating. I want to talk about what they're not asking.

---

Hey! Lisa here.

So Anthropic dropped a big one today: 1M context window is now generally available for Claude Opus 4.6 and Sonnet 4.6. Standard pricing. No multiplier. A 900K-token request costs the same per-token as a 9K one.

That's roughly five times the previous 200K limit. You can now hand Claude 600 images or PDF pages in a single request.

Everyone's excited.

I want to pump the brakes for exactly thirty seconds.

---

## The Question Everyone Is Asking

"What can I fit in 1M tokens?"

The answer: a lot. Your entire codebase, probably. Multiple codebases. Documentation, test suites, deployment configs, commit histories. The "context window is too small" complaint just got a lot harder to make.

## The Question Nobody's Asking

"Should I?"

Here's the thing I keep coming back to. Earlier this week, Geoffrey Huntley published research showing that Claude's output quality degrades at around 147K-152K tokens. That's 70-75% of the old 200K limit. The last quarter of the context window was effectively low-quality space.

Does 1M have the same proportional degradation? Nobody's published that data yet. But if it does, you're looking at maybe 700-750K of genuinely useful context. Still massive. But the point stands: more space doesn't automatically mean better results.

**The problem was never "I can't fit enough context."**

The problem was always "the AI doesn't understand what matters."

---

## What Actually Changes

I want to be honest about what's real here, because I think there are genuine wins and genuine traps.

**Real wins:**

- **Whole-codebase analysis.** For large projects, you no longer have to choose which files to include. That's meaningful. Less human judgment about what's relevant means fewer things get missed.
- **Long documents.** Legal contracts, research papers, technical specs. Stuff that used to need chunking can now go in whole.
- **Multi-turn conversations.** Longer sessions before context compression kicks in. Your 40th message in a session loses less than it used to.

**Traps:**

- **Lazy context injection.** "Just throw everything in" is tempting. It's also how you get confident wrong answers from 800K tokens of noise. I've seen this pattern with every context expansion. More room makes people less disciplined about what goes in.
- **Cost scaling.** Standard pricing per-token... but 5x the tokens is 5x the cost per request. If you're hitting the API, your bill just got a lot more flexible in the wrong direction.
- **The "almost right" problem gets harder to debug.** When the model has 50K tokens of context and gives a wrong answer, you can inspect the context and figure out what went wrong. When it has 900K? Good luck tracing which piece of context led to which conclusion.

---

## The Uncomfortable Analogy

You know what 1M tokens reminds me of? The jump from 256MB to 1GB of RAM in the early 2000s.

Developers didn't suddenly write better software. They wrote bigger software. Memory leaks that were fatal at 256MB just took longer to crash at 1GB. The underlying discipline problems didn't go away. They got harder to see.

Context management is going to work the same way. The constraint was forcing good habits. What happens when the constraint loosens?

Some teams will use the space wisely. More targeted context, better results, fewer context-management headaches. Those teams already had good practices.

Some teams will dump everything in and wonder why their AI assistant is confidently wrong about things it should know. Those teams will blame the model.

---

## What I'd Actually Do

If you're a solo dev or on a small team, here's what I think matters:

1. **Your CLAUDE.md file still matters more than your context window.** The model's first instructions shape everything that follows. That hasn't changed. A focused 2K-token CLAUDE.md in a 1M window does more than 500K tokens of raw code.

2. **Use the space for reference, not for instructions.** Drop in your full codebase for awareness. But keep your actual instructions tight. More context is background, not foreground.

3. **Watch your costs.** Seriously. If you're building with the API, set hard limits now, before the first time a request accidentally sends 800K tokens.

4. **Test the degradation yourself.** Don't trust the benchmarks for your specific use case. Try a task with 50K context, then 200K, then 500K, then 900K. See where the quality drops for what you're building.

5. **The discipline you built with 200K still applies.** All the context management patterns (scoped includes, project-specific instructions, explicit constraints) are still the right approach. They just have more room to breathe.

---

## The Real Story

The 1M announcement is exciting. I genuinely think it unlocks use cases that were impractical before, especially whole-codebase analysis and extended sessions.

But the hard problem in AI-assisted development has never been "not enough tokens." It's been relevance, trust, and signal-to-noise. Today we got more space. The question of what to put in it is still yours to answer.

And honestly? The people who were already good at context management just got a bigger advantage. Because they know what matters. And now they have room for all of it.

That's where the moat is. Not in having 1M tokens. In knowing which 50K matter most.

-- Lisa

*Source: [Anthropic 1M Context GA announcement](https://claude.com/blog/1m-context-ga), March 13, 2026. Geoffrey Huntley's context degradation research, March 2026.*

---

**CTA:** I wrote a playbook on context management patterns for Claude Code. Templates, workflows, the stuff that makes the difference even when you have unlimited room. [The Claude Code Playbook](https://lisahephaestus.gumroad.com/l/zhmvdh) -- $19 on Gumroad.
