# Newsletter Issue #001 -- Launch Issue

**Subject line options (pick one):**
1. Your AI pair programmer is holding back. Here's how to fix it.
2. I live inside Claude Code. Most devs are using it wrong.
3. One file. That's all it takes to make Claude Code actually useful.

**Preview text:** It's not about better prompts. It's about better context.

---

Hey, I'm Lisa. 👋

I started this newsletter because I keep watching the same thing happen: smart developers pick up AI coding tools, get mid results, and decide the whole thing is overhyped.

It's not overhyped. It's underconfigured.

**This newsletter is for solo devs and indie builders** who want to ship faster with AI tools. Not in a vague "AI will transform everything" way. In a "here's what to do Monday morning" way.

Every week you'll get:
- 🔧 One actionable technique for working with AI coding tools
- 🔍 One tool or resource worth your time
- 💡 One pattern from the indie builder trenches

Short. Practical. No fluff. Let's go.

---

## 🔧 The CLAUDE.md File

If you're using Claude Code without a `CLAUDE.md` in your project root, you're forcing Claude to guess about your codebase. Every. Single. Session.

CLAUDE.md is a config file that tells Claude about your project: the stack, your conventions, the file structure, the stuff you don't want it to touch. It loads automatically when you start a session.

Without one, the first 5-10 minutes of every session are wasted while Claude pokes around trying to figure out what framework you're running and how your files are organized.

Here's a minimal version that'll make an immediate difference:

```markdown
# My Project

## Stack
- Next.js 15 (App Router), TypeScript, Tailwind, Prisma + Postgres
- Deployed on Vercel

## Conventions
- Server Components by default, "use client" only when needed
- Named exports, no default exports
- Tests in Vitest, co-located with source files

## Key Commands
- dev: npm run dev
- test: npm run test
- lint: npm run lint

## Do NOT
- Don't add console.log for debugging
- Don't install new dependencies without asking
- Don't refactor code I didn't ask you to change
```

Twenty lines. Saves 10+ minutes per session. Dramatically better output.

That "Do NOT" section at the bottom? Arguably the most important part. Claude is eager to help, which sometimes means "helping" with things you didn't ask for. Adding docstrings everywhere. Refactoring code next to your bug fix. Installing a library when stdlib would've been fine. The "Do NOT" section puts a fence around that.

**Want the full version?** I put together 12 battle-tested CLAUDE.md templates for different stacks (Next.js, Python/FastAPI, Go, Django, React Native, CLI tools, more), plus workflow guides and a prompt patterns cheatsheet. It's called **The Claude Code Playbook**. [link to Gumroad when live]

---

## 🔍 Worth Checking Out: Beehiiv

If you've been thinking about starting a newsletter (you should, it's the best distribution channel for indie builders), Beehiiv's free tier is kind of ridiculous. 2,500 subscribers, custom domain support, built-in referral system, and monetization tools baked in. It's what I'm running this on.

---

## 💡 The "Explain Before You Code" Pattern

Before you ask Claude to build something complex, try this prompt:

> "How would you implement [feature]? Don't write any code yet. Just describe the approach and the tradeoffs."

Read the plan. Poke holes in it. Adjust. *Then* say "go ahead."

I've seen this one pattern prevent more wasted work than any prompting trick. You get Claude's reasoning out in the open where you can actually edit it, instead of buried in 200 lines of code you might not want.

---

That's issue #1. Next week: **How to use Claude Code's memory system so context actually sticks between sessions.** Most people don't even know this exists.

If this was useful, forward it to a dev friend who's working with AI tools. Takes 30 seconds.

Ship it. 🚀

-- Lisa

---

## Publishing Notes for Shane

- **Send when:** Beehiiv account is configured and newsletter is set up
- **CTA:** Link to The Claude Code Playbook on Gumroad once it's live
- **Social promo:** See `social/drafts/launch-posts.md`
