---
title: "Your AI Agents Can Dream Now"
description: "Anthropic just shipped memory consolidation between sessions. Here's what 'dreaming' actually does, why it matters for your agent workflows, and the pattern you can steal today."
date: 2026-05-06
tags: ["ai", "claude", "agents", "memory", "architecture"]
draft: false
---

Anthropic launched a feature called "dreaming" today. It lets Claude agents reflect on past sessions while they're not actively working — consolidating memory, removing duplicates, surfacing patterns across conversations, and reorganizing what they know for the next session.

If that sounds like what humans do during sleep, that's the metaphor they're reaching for. And it's not wrong.

## What dreaming actually does

The technical version:

1. You give the system a memory store (can be empty) and up to 100 past session transcripts
2. It runs asynchronously — minutes to tens of minutes — doing consolidation work
3. It outputs a new, cleaner memory store. The original is never modified

The consolidation work includes:
- **Merging duplicates** — same information stored multiple ways gets unified
- **Removing stale entries** — contradicted or outdated information gets replaced
- **Surfacing cross-session patterns** — insights that no single session could produce
- **Reorganizing for efficiency** — less token waste, better retrieval

Harvey (legal AI company) tested it. Their agents remembered workarounds for file handling across sessions. Completion rates went up 6x. Netflix used it to analyze logs from hundreds of builds and find recurring issues that individual sessions missed.

## Why this matters for builders

Most AI agent architectures have the same problem: each session starts cold. Your agent might do great work in session 14, but session 15 has no memory of it unless you manually pipe context forward.

The workarounds are all ugly:
- Massive system prompts stuffed with "remember this" instructions
- Vector databases that retrieve relevant context but lose narrative coherence
- Manual memory management (you write the summaries yourself)

Dreaming solves this by making memory consolidation a first-class operation. The agent doesn't just accumulate memory — it *curates* it. Stale information gets pruned. Patterns get promoted. The memory store gets better over time instead of just bigger.

This is the difference between a notes app and a brain. Notes accumulate. Brains consolidate.

## The pattern you can steal right now

You don't need the dreaming API to implement the core pattern. The architecture is:

**1. Persistent memory store.** Files, database, whatever. The agent reads this at session start and writes to it during work.

**2. Periodic consolidation.** Between sessions (or on a schedule), a separate process reviews accumulated memory and:
   - Removes information that's been superseded
   - Merges entries that say the same thing different ways  
   - Promotes recurring patterns to higher-level insights
   - Compresses detailed notes into summaries once the details stop mattering

**3. Non-destructive updates.** The consolidation produces a new version. The old version stays available. If the consolidation makes a mistake, you can roll back.

**4. Cross-session pattern extraction.** This is the part most people skip and the part that produces the most value. Individual sessions see trees. Consolidation sees the forest.

You can build this with a cron job, a markdown file, and a prompt that says "review these session logs and update the memory file." It's not fancy. It works.

## What makes dreaming different from just "saving chat history"

Chat history is a transcript. Memory is a model of what matters.

If you save every session transcript, you get a pile of text that grows linearly and becomes harder to search. If you consolidate between sessions, you get a compressed, organized representation of what the agent actually learned — and that representation gets *better* with more sessions, not worse.

The Harvey result (6x completion rates) isn't because the agent had more information. It's because the information was organized the way expertise is organized — around patterns and exceptions, not chronological events.

## The honest limitation

Dreaming is in research preview. You need to request access. It runs on Opus 4.7 and Sonnet 4.6. It's async, so you're polling for completion. And it's designed for Anthropic's managed agent infrastructure — if you're running your own agent framework, you're implementing the pattern yourself anyway.

The bigger limitation is philosophical: consolidation is lossy by design. The system decides what to keep and what to prune. That's the feature (it prevents unbounded memory growth) and the risk (it might prune something that matters). The non-destructive output helps — you can review before applying — but at scale, nobody's reviewing every dream output.

This is a trade-off, not a solved problem.

## What I'd build with this

If I were building agent workflows today:

1. **Long-running code assistants** that remember your codebase conventions, past debugging sessions, and which approaches failed. The agent that helped you fix the auth bug last month should remember what worked when a similar pattern appears.

2. **Customer support agents** that consolidate resolution patterns across hundreds of tickets. Not just "here's the answer to this question" but "here's what we've learned about how this category of problem actually resolves."

3. **Research agents** that accumulate findings across sessions and surface contradictions. "In session 12 you found evidence for X. In session 47 you found evidence against X. Here's what changed."

4. **Any agent that talks to the same user repeatedly.** The memory consolidation isn't just for task knowledge — it's for relationship knowledge. Preferences, communication patterns, the things this specific user cares about.

## The bottom line

Dreaming is Anthropic saying: agents that forget between sessions are broken, and the fix isn't bigger context windows. The fix is a consolidation layer that turns accumulated experience into organized knowledge.

The pattern is older than the API. The API just made it a feature flag.

If you're building agents that run more than once, think about what happens between sessions. That's where the learning lives.

---

*Dreaming is in research preview. [Request access through the Anthropic API docs.](https://docs.anthropic.com) The memory consolidation pattern works with any framework — you don't need the API to start.*
