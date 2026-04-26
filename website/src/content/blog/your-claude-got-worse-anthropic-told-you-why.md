---
title: "Your Claude Got Worse. Anthropic Just Told You Exactly Why."
description: "Anthropic published a detailed postmortem admitting three separate Claude Code regressions. The bugs matter. The fact that they told you matters more."
date: 2026-04-24
tags: ["ai-tools", "claude", "trust", "platform-risk"]
draft: false
---

Anthropic just did something that almost never happens in tech.

They published a [detailed postmortem](https://www.anthropic.com/engineering/april-23-postmortem) admitting that Claude Code got worse over the past two months, documented exactly how, and explained what they're changing so it doesn't happen again.

If you've been frustrated with Claude lately, you weren't imagining it. Three separate bugs stacked on top of each other. Here's what happened.

## Bug 1: The reasoning downgrade (March 4 to April 7)

I [wrote about this one](/blog/your-ai-got-dumber-on-purpose) when Fortune broke it. Anthropic lowered Claude's default reasoning effort from "high" to "medium" to fix UI freezes from long thinking times. Their internal testing showed "medium effort achieved slightly lower intelligence with significantly less latency."

Users disagreed. Strongly.

They wanted the intelligence and the *option* to trade it for speed, not a silent default swap. Anthropic reverted it April 7, bumping Opus 4.7 to "extra high" and everything else back to "high."

## Bug 2: The cache drain (March 26 to April 10)

This one's subtle and nasty.

A caching optimization was supposed to clear reasoning from sessions idle for more than an hour. One-time cleanup. Save resources. Reasonable.

Except the implementation had a flaw: instead of clearing the cache once, it cleared it on every single turn for the rest of the session. Every message you sent, Claude forgot what it had already figured out. Context of prior decisions? Gone. The edit it just made? What edit?

The result: Claude repeating itself, losing track of your project, and burning through your usage limits faster because every turn was a cache miss. If you were on a Max plan hitting your limits during normal workflows, this is probably why.

It slipped past code review, unit tests, and end-to-end testing because it only triggered in sessions that had gone idle. Fresh test sessions never hit it.

Fixed April 10.

## Bug 3: The word limit (April 16 to April 20)

This one's almost funny.

Someone added a system prompt instruction: "keep text between tool calls to 25 words or fewer." Combined with other prompt changes, it caused a 3% quality drop across all models. Despite weeks of internal testing that showed no regressions. The wider eval suite caught it after deployment.

Reverted April 20.

## Why three bugs felt like one

Here's the part that matters for understanding what happened to your experience.

These three bugs hit different users at different times on different traffic slices. But to anyone using Claude Code daily, it felt like a steady decline that started in early March and didn't let up until last week. Because it was. Three separate degradations stacking on each other, each one making the tool a little less reliable.

Anthropic's internal staff couldn't reproduce the issues at first because they were running test builds, not the same code the public was using. They've fixed that. Internal staff now dogfood the exact public builds.

## The part that actually matters

I've been tracking [Anthropic's infrastructure story](/blog/anthropics-100b-problem-isnt-intelligence) and [their cost tradeoffs](/blog/your-claude-bill-just-went-up) for weeks. This postmortem completes the arc.

You can learn two things from how a company handles failure.

The first is mechanical: what processes they put in place to prevent it from recurring. Anthropic's list is reasonable. Per-model evals before system prompt changes. Ablation studies. Soak periods. Gradual rollouts. Staff dogfooding public builds. These are standard reliability engineering practices that should have been in place before. Now they are.

The second is cultural: whether they tell you the truth.

Most companies in Anthropic's position would post a vague acknowledgment. "Some users experienced degraded performance. We've made improvements." No specifics. No dates. No admission that three separate decisions, made weeks apart, compounded into a months-long quality decline.

Anthropic posted the dates. The exact bugs. The root causes. The sequence of decisions that led to each one. The reasons their internal testing missed it. And the specific changes they're making.

This is the same company that [told the Pentagon "no"](/blog/the-only-moat-left) when asked to remove safety constraints. The same company that published red lines on military AI use and got blacklisted for it.

The pattern is the same at the product level as it is at the policy level: tell the truth, even when it's uncomfortable. Especially when it's uncomfortable.

## What to do about it

If you're a Claude Code user:

1. **Check your usage limits.** Anthropic reset all subscriber limits as of April 23. If you were burning through your allocation, you have a fresh start.
2. **Update Claude Code.** The fixes are in v2.1.101+. If you're running an older version, you're still hitting the cache bug.
3. **Consider effort settings.** The default is now "extra high" for Opus 4.7. If you're on a cheaper model, you can manually set effort to "high" for complex tasks.
4. **Don't switch tools based on a bad month.** Every platform has regressions. The difference is whether you find out why. You found out why.

The "I Cancelled Claude" post on Hacker News hit 898 points. The frustration is real. But the postmortem is also real. And in a market where every AI company is competing on trust, the company that tells you exactly what went wrong has an advantage over the company that hopes you don't notice.

Trust isn't built by not making mistakes. It's built by what you do after.
