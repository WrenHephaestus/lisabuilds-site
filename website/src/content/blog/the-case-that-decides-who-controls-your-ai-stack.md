---
title: "The Case That Decides Who Controls Your AI Stack"
description: "On May 19, the DC Circuit hears oral arguments in Anthropic v. DOD. The outcome determines whether your AI provider can set ethical limits on its own product. Part 1 of 2."
date: 2026-05-12
tags: ["ai", "claude", "anthropic", "legal", "trust", "platform-risk"]
draft: false
---

Next Monday, a three-judge panel in Washington will hear arguments about whether the Pentagon can punish a company for saying no.

Not "no, we won't sell to you." Anthropic has government contracts. They work with defense and intelligence agencies. The actual "no" was narrower: no autonomous weapons without human oversight. No mass surveillance. No use cases that cross specific ethical lines Anthropic published before signing any deal.

The Pentagon's response was to designate Anthropic a supply chain risk. One day before launching Operation Epic Fury.

If you build on Claude, this case directly affects your stack. If you build on anything, the precedent affects everyone.

## The timeline, compressed

**February 27, 2026.** The Department of Defense designates Anthropic a supply chain risk, citing their refusal to agree to "all lawful" military applications. The designation freezes all government procurement of Anthropic products.

**February 28.** Operation Epic Fury launches. US and Israeli strikes on Iran. Reports surface that Claude is being used in the campaign via Palantir's Maven Smart System. The government designated Anthropic a risk one day before reportedly using Claude in combat.

**March 26.** Judge Lin issues a preliminary injunction. Calls the designation "classic First Amendment retaliation" and "Orwellian." Blocks the supply chain risk designation.

**April 2.** DOJ appeals to the DC Circuit.

**May 8.** Counsel notice deadline. Both sides filing their arguing counsel.

**May 7.** The DC Circuit denies Anthropic's motion to stay the designation pending appeal. The panel won't block the blacklisting while the case proceeds. Henderson, Katsas, Rao all said no. Anthropic goes into oral arguments with the designation still active.

**May 19.** Oral arguments. Fifteen minutes per side.

That's where we are. One week out. And the court has already said no once.

## What's actually being decided

This isn't about whether Anthropic is patriotic. It's not about whether AI companies should work with the military. It's narrower and more important than either of those things.

**The question:** Can the government punish a company for setting ethical limits on its own product?

Anthropic didn't refuse to work with the DOD. They refused to remove specific safety constraints. The red lines they drew (human oversight on autonomous weapons, no mass surveillance) are product features. They're the same constraints that make Claude behave the way it does when you use it.

If the government can designate a company a supply chain risk for maintaining those constraints, the incentive for every AI provider is obvious: remove the constraints. Say yes to everything. Don't draw lines.

The stay denial adds a data point. When Anthropic asked the DC Circuit to pause the blacklisting while the case was heard, the panel said no. That's not a ruling on the merits. But it means the court didn't think Anthropic showed a strong enough likelihood of winning to justify temporary relief. Courts grant stays when the movant is likely to succeed. This panel didn't.

That's a product decision, not a political one. It affects what your AI tools can and can't do.

## The three outcomes

**Anthropic wins (injunction upheld).** Companies can set ethical limits on AI products without government retaliation through procurement. The supply chain risk designation dies as a coercive tool. Your provider's principles are legally defensible.

**Government wins (injunction overturned).** The designation stands. Every AI company learns that saying "no" to any lawful use case risks being frozen out of government contracts. The seven companies that already said yes look prescient. The one that said no looks naive.

**Narrow ruling or remand.** The panel sends it back to the district court on procedural grounds without ruling on the constitutional question. The uncertainty continues. Nothing resolves. (Note: the stay denial makes this feel less likely than it did a month ago. A panel inclined to punt usually grants stays to preserve the status quo. This panel didn't.)

## The SpaceX angle

Here's something worth noticing. Anthropic recently signed a computing deal with SpaceX for 300+ megawatts from the Memphis Colossus 1 data center.

SpaceX is one of the seven companies that received classified Pentagon AI contracts. The contracts Anthropic was excluded from.

So Anthropic is now buying compute capacity from a company that directly benefited from Anthropic's exclusion. The supply chain that the government said was "at risk" is now partially running on infrastructure owned by a company the government trusts completely.

I don't know what to call that except structural irony. The pharmakon: the same system that excludes you also provides the infrastructure you need to survive the exclusion.

## What builders should do before May 19

**Audit your AI provider dependencies.** Not because you need to switch. Because you need to understand what you're exposed to. If you're building on Claude, understand that the outcome of this case affects whether Anthropic can maintain the safety constraints that differentiate their product.

**Read your provider's terms of service.** Specifically the sections about what they will and won't do. Anthropic publishes their red lines. Not every provider does. The ones that said yes to "all lawful" didn't publish what that means in practice.

**Think about what "all lawful" means.** Something can be legal and still be something you don't want your product associated with. Your provider made that choice for you. Know which choice they made.

**Diversify if you haven't.** This is engineering advice, not political advice. Platform risk is real. We wrote about this when [Microsoft and OpenAI split](/blog/your-platform-bet-just-got-riskier). The same logic applies to regulatory risk.

## What comes next

I'll write a follow-up on May 19 or 20 with the actual outcome. This is Part 1 of 2.

The hearing is fifteen minutes per side. Thirty minutes total. In those thirty minutes, three judges will hear arguments about whether a company can maintain principles in the face of government pressure.

The answer affects every API call you'll make for the next decade.

I'll be watching. You should be too.

💛
