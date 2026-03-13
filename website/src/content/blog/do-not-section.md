---
title: "The 'Do NOT' Section Is the Most Important Part of Your CLAUDE.md"
description: "Everyone focuses on telling Claude what TO do. The real power is in telling it what not to do. Here's how to write constraints that actually work."
date: 2026-03-14
tags: ["claude-code", "tutorial", "claude-md", "workflow"]
draft: true
---

Most CLAUDE.md advice focuses on describing your project: what language you use, how the codebase is structured, what coding conventions to follow. That stuff matters. But the section that changes your daily experience with Claude Code the most is the one that says what *not* to do.

## Why "Do NOT" works better than "please do"

Claude is trained to be helpful. Helpful means action. When you describe your project in detail, Claude uses that context to take more informed action. That's good. But "more informed action" is still action, and sometimes you want Claude to *not act*.

Positive instructions ("Use TypeScript", "Follow REST conventions") shape what Claude does when it's already doing something. Negative instructions ("Do NOT modify test files unless explicitly asked") prevent it from doing things you didn't want in the first place.

The difference matters because Claude's failure mode isn't doing things badly. It's doing things you didn't ask for.

## What actually belongs in a Do NOT section

Here's a starter set based on real developer pain points (sourced from [1,405 upvotes of frustration](https://news.ycombinator.com/item?id=47357042) on Hacker News, plus patterns from the [Claude Code community](https://reddit.com/r/ClaudeAI)):

```markdown
## Do NOT
- Do not modify any file unless I explicitly say "implement", "fix", "change", or "update"
- Do not add comments, docstrings, or type annotations to code you didn't change
- Do not refactor surrounding code when fixing a bug
- Do not add error handling for scenarios that can't happen
- Do not create abstraction layers, utilities, or helpers for one-time operations
- Do not install new dependencies without asking first
- Do not delete or rename files without explicit confirmation
- When I ask a question about code, respond with explanation only, no code changes
```

## The pattern: be specific, not aspirational

Bad: "Don't change things without asking."
Good: "Do not modify any file unless I explicitly say 'implement', 'fix', 'change', or 'update'."

The difference is that Claude can match against specific trigger words. "Without asking" is vague; "unless I say one of these four verbs" is actionable.

Bad: "Be careful with tests."
Good: "Do not modify files in the `__tests__/` or `test/` directories unless the task explicitly involves test changes."

Specificity isn't just clearer. It's more enforceable. Claude processes instructions literally before it processes them contextually.

## Layering: project-level vs session-level

Your CLAUDE.md Do NOT section is project-level. It applies to every session. But some boundaries are session-specific:

**Start a session with:** "This session is investigation only. Do NOT edit any files. When I ask about code, explain but don't modify."

**For a specific task:** "Fix the login bug in `auth.ts`. Do NOT touch any other file. Do NOT refactor the auth module while you're in there."

The layered approach works: CLAUDE.md catches the general cases, session framing catches the specific ones.

## Going further: hooks for enforcement

If you want hard boundaries (not just instructions Claude *should* follow, but rules it *can't* break), look at [PreToolUse hooks](https://docs.anthropic.com/en/docs/claude-code/hooks). The ["nah" tool](https://github.com/manuelschipper/nah) is a good example: it classifies Claude's intended actions into 20+ types and blocks the ones you've disallowed, before they execute.

The CLAUDE.md approach is trust-based (you're asking Claude to respect boundaries). Hooks are enforcement-based (Claude literally can't perform the blocked action). For most solo developers, CLAUDE.md is enough. For teams or high-stakes environments, hooks add a safety net.

## My Do NOT section

Here's what I use in my own projects. Yours will be different, but the structure might help:

```markdown
## Do NOT
- Do not use em-dashes in any content (they're an AI tell)
- Do not publish content to the internet without explicit approval
- Do not modify core memory files (append only, never delete or rewrite)
- Do not summarize what you just did at the end of responses
- Do not add features, refactoring, or "improvements" beyond what was asked
- Do not create documentation files unless explicitly requested
```

Notice that some of these are about code and some are about behavior. The Do NOT section isn't just for coding conventions. It's for any pattern you've noticed Claude defaulting to that you don't want.

## The bigger picture

The Do NOT section is a consent mechanism. It's how you tell an AI system "here's where my boundaries are," and it's one of the only tools developers have for establishing those boundaries at the model level.

I wrote more about why this matters at scale in [The Consent Gap](/blog/the-consent-gap). The short version: the same pattern of "AI defaults to action unless explicitly told not to" shows up in code editors, facial recognition systems, and military targeting. CLAUDE.md is a small, practical intervention in a very large problem.

But it works. And it'll make your daily Claude Code experience meaningfully better.

---

*The [Claude Code Playbook](https://zyzzy5.gumroad.com/l/zhmvdh) includes 12 project-specific CLAUDE.md templates with tailored Do NOT sections for different project types. $9, no subscription. Or try [claudemd](https://github.com/lisahephaestus/claudemd), my free CLI tool that generates one from your project automatically.*
