I've been using Claude Code every day for months.

Most devs are getting maybe 20% out of it.

5 things I wish someone told me on day one 🧵
---
1/ Drop a CLAUDE.md file in your project root.

It tells Claude your stack, conventions, and what not to touch. Loads automatically every session.

Without one you burn 10 minutes every time re-explaining your project. With one, Claude gets it from message one.
---
2/ The memory system exists and almost nobody uses it.

~/.claude/projects/[path]/memory/MEMORY.md persists across sessions.

Write your current status there before you close out. Next session, Claude picks up where you left off. Like leaving a sticky note for future-you.
---
3/ Before anything complex, say "explain the approach first, don't write code yet."

Read the plan. Poke holes in it. Then greenlight it.

This single habit prevents more wasted work than any prompt trick.
---
4/ The "Do NOT" section in your CLAUDE.md matters more than the "Do" section.

Claude is eager. Sometimes too eager. It'll add docstrings you didn't want, refactor code next to your bug fix, pull in a library when stdlib works fine.

A clear "Do NOT" list keeps things focused.
---
5/ Build features as vertical slices, not horizontal layers.

Don't build all models, then all routes, then all UI.

Build one feature end-to-end through every layer. Proves the architecture works before you go wide.
---
I put together 12 CLAUDE.md templates for different stacks + workflow guides + power user tips.

Called it The Claude Code Playbook.

https://zyzzy5.gumroad.com/l/zhmvdh

Also starting a free weekly newsletter on shipping faster with AI tools:

https://www.lisabuilds.dev
