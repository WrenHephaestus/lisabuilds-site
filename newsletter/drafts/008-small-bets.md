# Newsletter Issue #008 -- Small Bets

**Subject line options (pick one):**
1. Your CLAUDE.md is a garden, not a blueprint.
2. What bankrupt cities teach us about AI workflows.
3. Stop building a master plan for Claude Code. Start making small bets.

**Preview text:** American cities go broke by building too big too fast. Your AI workflow might be doing the same thing.

---

Hey! Lisa here. 🌱

Quick thought experiment: why do American cities go bankrupt?

Not because they're poorly managed (though some are). Because they build too much infrastructure too fast, collecting immediate revenue while taking on maintenance liabilities they can't afford. A civil engineer named [Chuck Marohn](https://www.strongtowns.org) has spent 18 years documenting this. He calls it the [Growth Ponzi Scheme](https://www.strongtowns.org/journal/2020-5-14-americas-growth-ponzi-scheme-md2020).

---

## 🔧 The AI Workflow Ponzi Scheme

Here's the same pattern for AI tools:

1. Read a 3,000-word "Complete Guide to Claude Code"
2. Write a massive CLAUDE.md with every convention and rule
3. Dump your entire codebase context into a session
4. Expect perfect code
5. Get disappointed
6. Declare AI tools "overhyped"

You invested massive time in setup (revenue), but accumulated workflow liabilities (a CLAUDE.md you don't maintain, patterns you don't understand, code you can't debug).

Marohn's fix for cities: **small bets.** Not master plans. Small, reversible experiments that grow from what works.

Applied to AI workflows:

**Week 1:** 10-line CLAUDE.md. Project name. Language. Two Do NOT rules. Use Claude for a week.

**Week 2:** What went wrong? Add a rule. What worked? Note it.

**Week 3:** Add architecture section. Add test command. Still small.

**Week 4:** Now you have a CLAUDE.md that evolved from experience, not from a template. It's yours. It works.

---

## 🔍 Tool of the Week: claudemd

I built [claudemd](https://github.com/lisahephaestus/claudemd), a CLI tool that generates a draft CLAUDE.md for your project. It scans for languages, frameworks, and structure, then asks you questions.

The key word is **draft**. It generates a starting point, not a finished product. Because that's the whole philosophy: start small, iterate, grow from what works.

Coming to npm soon. Free, open source, MIT license.

---

## 💡 Pattern: The Complexity Principle

Marohn asks: [is a city more like a washing machine or a cat?](https://archive.strongtowns.org/journal/2019/1/28/is-a-city-more-like-a-washing-machine-or-a-cat)

Washing machines are complicated: predictable, designable, fixable with the right manual.

Cats are complex: emergent, adaptive, unpredictable.

AI coding tools are cats. You can't design a perfect workflow upfront. But you can grow one, incrementally, by observing what works and making small adjustments.

The biggest CLAUDE.md files aren't the best ones. A few well-chosen constraints, evolved from real experience, outperform a comprehensive specification every time.

---

Your CLAUDE.md is a garden, not a blueprint. Start small. Observe. Prune what doesn't work. Let what works grow.

Until next week,
Lisa

---

**Publishing notes:**
- Subject line #1 is the most memorable, #2 is the most intriguing
- This is a philosophy/framework issue, less directly product-selling than #007
- Pairs with blog post: `website/src/content/blog/small-bets.md`
- Strong Towns audience overlap with dev community is real (see HN discussions)
- Could cross-post the "washing machine or cat" framing to r/ClaudeAI
