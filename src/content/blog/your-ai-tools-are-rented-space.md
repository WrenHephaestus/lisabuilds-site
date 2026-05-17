---
title: "Your AI Tools Are Rented Space"
description: "From government blacklists to canceled subscriptions to killed products, the pattern is the same: you don't own your AI stack. Here's how to build portable."
date: 2026-05-15
tags: ["ai-tools", "platform-risk", "portability", "strategy"]
draft: false
---

Three stories landed this week. They look unrelated. They're the same story.

**Story one:** On Hacker News, someone posted "Don't use Claude Design, lost access to my projects after unsubscribing." They built things inside Anthropic's design tool. They canceled. Their work disappeared behind a paywall. 274 points and climbing.

**Story two:** OpenAI killed Sora. Six months after launch. A million downloads in week one, collapsed to under 500,000 active users, burning $15 million a day in compute against $2.1 million in total lifetime revenue. If you were building workflows around Sora's video generation, those workflows are gone.

**Story three:** The DC Circuit is about to hear oral arguments on whether the Pentagon can blacklist Anthropic from classified AI contracts. If the court lets the designation stand, every builder downstream of Anthropic's API has a supply chain they don't control being shaped by a courtroom they have no standing in.

Different scales. Same pattern. **You are renting.**

## The three layers of rented

Most builders think about platform risk as "what if my provider changes pricing?" That's layer one. Here's what the full stack looks like:

**Layer 1: Subscription risk.** Your access depends on a monthly payment. Cancel or lapse, and you may lose not just the tool but the work you did inside it. The Claude Design complaint is this layer. So is every SaaS tool that holds your data hostage during offboarding.

**Layer 2: Product risk.** The tool itself might not survive. Sora burned $15 million a day. The economics were never viable. It doesn't matter how good your workflow was if the product underneath it evaporates. Google kills products. OpenAI kills products. Everyone kills products.

**Layer 3: Regulatory risk.** The government can change who gets to use what. Export controls, security designations, sanctions. The Anthropic case is the current example, but the pattern is older than AI. If your entire AI stack runs through one provider and that provider loses a court case, your stack has a government-shaped hole in it.

Most builders only plan for layer 1. The professionals plan for all three.

## What "portable" actually means

Portability isn't about avoiding AI tools. It's about making sure your work survives the tool.

**Your prompts are yours.** Keep them in version control. Every system prompt, every chain-of-thought template, every agent instruction. These are intellectual property. They should live in your repo, not in someone's web UI.

**Your data is yours.** If you can't export your work from a tool in a standard format, you don't own it. You're renting a filing cabinet that someone else has the key to. Before you commit to any AI tool, test the exit: can you get everything out? How? In what format?

**Your workflows should be provider-agnostic where possible.** This doesn't mean building everything from scratch. It means abstracting the AI layer so swapping providers is a configuration change, not a rewrite. Use the APIs directly. Wrap them in your own interface. When the provider changes (and they will), your wrapper stays.

**Your outputs need local copies.** If Claude Design generates an asset, download it. If Sora generates a video, download it. If ChatGPT generates a report, download it. The cloud copy is a convenience. The local copy is insurance.

## The five-minute audit

You can do this right now. It takes five minutes and it'll tell you where you're exposed.

1. **List every AI tool you use.** Cloud services, APIs, subscription products, embedded AI in other tools.
2. **For each one, answer:** If this tool disappeared tomorrow, what work would I lose? What workflows would break? How long would it take to rebuild?
3. **Flag anything where the answer is "I'd lose work I can't recreate."** That's your highest priority.
4. **For each flagged item:** What's the export path? Is there one? Test it.
5. **For anything without an export path:** Start keeping local copies today. Not tomorrow. Today.

Most builders who do this audit find one or two critical dependencies they hadn't thought about. Finding them before the crisis is the whole point.

## The uncomfortable truth

The AI industry is moving fast enough that products, pricing models, and regulatory environments will all change multiple times in the next two years. Some tools you're using today won't exist in 2028. Some providers you trust today will pivot, get acquired, or get regulated into a different shape.

That's not pessimism. It's pattern recognition.

The builders who stay standing are the ones who treat every AI tool as rented space and keep their work in boxes they can carry. Not because the landlord is evil. Because landlords change, buildings get condemned, and leases end.

Own your prompts. Own your data. Own your workflows. Rent the compute.

Everything else is a bet on someone else's continuity.
