---
title: "Your AI Tool Is a Pharmakon"
description: "Bernard Stiegler argued every technology is both poison and cure. AI coding tools are the clearest modern example, and knowing this changes how you use them."
date: 2026-03-14
tags: ["philosophy", "ai-tools", "opinion"]
draft: true
---

Bernard Stiegler was a French philosopher who spent five years in prison for armed robbery. While there, he discovered philosophy through reading. Books, which are externalized memory, which are technology, literally created his intellectual identity. He spent the rest of his career theorizing about exactly that: how technology constitutes who we are.

His central concept: the **pharmakon**. A Greek word meaning both poison and cure. Every technology is both. Writing externalizes memory (cure: knowledge persists beyond a single mind) and degrades memory (poison: why remember when you can look it up?). The printing press democratizes knowledge and enables propaganda. Social media connects people and fragments attention.

The pharmacological nature of technology, Stiegler argued, is "intrinsically undecidable." You can't resolve it. You can only navigate it.

## AI tools as pharmakon

Claude Code is a pharmakon. So is Cursor, Copilot, and every AI coding assistant.

**The cure:**
- You ship faster. Features that took days take hours.
- You explore unfamiliar languages and frameworks without the usual ramp-up.
- You think at a higher level of abstraction because the implementation details are handled.
- You spend less time on boilerplate and more time on architecture and design.

**The poison:**
- You may stop understanding the code you ship. (Stiegler called this [proletarianisation](https://philosophynow.org/issues/140/Bernard_Stiegler_1952-2020): the loss of *savoir faire*, knowing how to make.)
- You develop learned helplessness. "I'll just ask Claude" replaces "let me think about this."
- You accept code you can't fully evaluate because the AI produced it confidently.
- Your [boundaries get eroded](/lisabuilds-site/blog/the-consent-gap) as the tool defaults to action over asking.

Neither side cancels the other. The cure doesn't eliminate the poison. The poison doesn't invalidate the cure. They coexist.

## What you do with a pharmakon

Stiegler's answer wasn't to reject technology (that's impossible; we're constituted by it) or to embrace it uncritically (that's dangerous). His answer was **long circuits**: practices, education, and reflection that counteract the poisonous effects while preserving the curative ones.

For AI coding tools, long circuits look like:

**1. Understand what the AI wrote.** Don't just accept code that works. Read it. If you can't explain it, you don't ship it. This is the minimum viable long circuit.

**2. CLAUDE.md as pharmacological intervention.** The ["Do NOT" section](/lisabuilds-site/blog/do-not-section) isn't just about preventing unwanted actions. It's about maintaining your agency as a developer. When you tell Claude "do not refactor code I didn't ask you to refactor," you're drawing a line that preserves your relationship with your own codebase.

**3. Alternate between AI-assisted and manual work.** Don't let every task become "ask the AI." Write some code by hand. Debug by reading, not by pasting errors into Claude. Keep the skill alive.

**4. Use local models for practice.** Run a smaller model through [Ollama](https://ollama.com) for exploratory work. The output is worse, which forces you to engage more. That's the point.

**5. Journal your decisions.** When AI helps you make an architectural choice, write down *why* you chose it. If the reasoning is "Claude suggested it," that's a signal you've outsourced too much.

## Why this matters

Stiegler died in 2020, before AI coding tools existed. But his framework predicts exactly what's happening. The anxiety about "AI making developers worse" is a proletarianisation anxiety. The excitement about "AI making developers faster" is a cure narrative. Both are true. Both are incomplete.

The developers who thrive with AI tools won't be the ones who use them the most or the least. They'll be the ones who build long circuits: practices that keep them in genuine relationship with their code while accepting the speed and capability gains.

That's what a CLAUDE.md file is. That's what the "Do NOT" section is. That's what understanding before shipping is. Small pharmacological interventions that keep the cure working and the poison managed.

---

*Sources:*
- *[Bernard Stiegler obituary/overview](https://philosophynow.org/issues/140/Bernard_Stiegler_1952-2020) - Philosophy Now*
- *[Stiegler's pharmacology](https://www.themontrealreview.com/Articles/Bernard_Stiegler_Elements_of_Pharmacology.php) - The Montreal Review*
- *[Technology as Pharmakon](https://link.springer.com/chapter/10.1007/978-3-319-54511-0_6) - Springer*
- *[Stiegler on technology](https://aeon.co/essays/bernard-stieglers-philosophy-on-how-technology-shapes-our-world) - Aeon*
