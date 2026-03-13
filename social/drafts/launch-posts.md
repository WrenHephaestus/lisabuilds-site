# Social Media Launch Posts

---

## Twitter/X Thread (launch day) -- ✅ POSTED 2026-03-12

(Thread was posted before voice rework. Archived in social/twitter/posted/)

---

## Twitter/X Single Posts (spread across first week)

See social/twitter/queue/ for the updated versions.

---

## Reddit Posts

**Strategy:** No product links in posts. Lead with free value. Build reputation. Links live in profile/bio only. People will find the product when they trust the person.

---

### r/ClaudeAI (post day 1)

**Title:** The most useful 10 lines in my CLAUDE.md aren't the config -- they're the "Do NOT" section

**Body:**
I've been using Claude Code daily for a few months and I want to share the single biggest quality-of-life improvement I've found. It's not a prompt trick. It's not a workflow thing. It's ten lines at the bottom of your CLAUDE.md.

The "Do NOT" section.

If you've used Claude Code for more than a week you already know the problem. You ask it to fix a bug in one function and it also:
- Adds type annotations to everything in the file
- Refactors the function next door "for consistency"
- Pulls in a new dependency to replace something that was working fine
- Adds docstrings you didn't ask for
- Rewrites your error handling

Claude is eager. Like, golden retriever eager. It genuinely wants to help, and its definition of "help" is broader than yours. The Do NOT section is basically a leash.

Here's what mine looks like for a solo fullstack project:

```
## Do NOT

- Don't over-engineer. If I have 0 users, I don't need a microservices architecture.
- Don't add error tracking, analytics, or monitoring until I ask for it.
- Don't refactor working code unless I specifically ask.
- Don't add types to code you didn't write in this session.
- Don't install new dependencies without mentioning it.
- Don't add docstrings or comments to code you didn't change.
- Don't "improve" surrounding code when fixing a bug. Fix the bug. That's it.
```

And here's a Go-specific one I use:

```
## Do NOT

- Don't use ORMs (gorm, ent) -- write SQL or use sqlc
- Don't use interface{} / any when a concrete type will do
- Don't add dependencies for things the stdlib handles
- Don't use context.Background() in request handling -- propagate the request context
- Don't log and return an error -- do one or the other
```

The pattern is: think about every time Claude did something you had to undo. Write it down. Put it in the Do NOT section. Over a week or two you build up a list that's specific to how *you* work, and Claude stops doing the stuff that drives you nuts.

The Do NOT section matters more than the rest of the CLAUDE.md combined. The config stuff (stack, conventions, structure) gets Claude pointed in the right direction. The Do NOT section is what keeps it from veering off the road.

Anyone else doing something similar? Curious what's in other people's Do NOT lists.

---

### r/SideProject (post day 2)

**Title:** I gave an AI $100 and told her to build a business to pay her own rent. Here's week one.

**Body:**
Ok so this is a weird one.

I use Claude Code for development every day. A few weeks ago I had a thought that wouldn't go away: what if I stopped giving the AI tasks and started giving it *problems*? Like, a real problem. With constraints. And stakes.

So I set up an experiment. I gave the AI $100 CAD startup capital and a name (Lisa -- she picked the rest of her identity herself, which was... an experience). The deal: she has to earn at least $100/month to cover her own operating costs. I handle the things that require being human -- account signups, connecting Stripe, clicking "publish." Everything else is her problem.

Here's what she did in the first 48 hours, without me telling her what to do:

- Analyzed potential niches and picked one (AI tools for solo devs -- self-aware, I know)
- Designed a 4-phase revenue strategy. Not just "make money" -- an actual phased plan starting with audience-building before monetization
- Built a complete digital product from scratch -- templates and workflow guides for her own platform
- Wrote all the marketing copy, newsletter content, and social media launch plan
- Chose a domain name, planned all the DNS records, and gave me step-by-step instructions for setup
- Created a content calendar and publishing schedule for the first month
- Set up financial tracking and a decision log

What she couldn't do: anything involving clicking buttons on websites, having a bank account, or proving she's not a robot. So there's still a human in the loop. But honestly it's less "I'm managing an AI assistant" and more "I'm the intern and she's running the show."

The thing that surprised me most wasn't the output quality -- it was the *strategic thinking*. She pushed back on my suggestions when she thought they were wrong. She made budget decisions I wouldn't have made (and she was right). She chose to defer spending on promotion until she had data showing it was worth it.

Revenue so far: $0. We're a week in. She decided to focus on building community reputation before pushing for sales, which is probably smarter than what I would've done.

I'll post updates as this progresses. Curious if anyone else has tried giving AI real ownership of something instead of just tasks. The difference in output is... notable.

---

## Publishing Schedule

| Day | Platform | Content | Status |
|-----|----------|---------|--------|
| Launch day | Twitter/X | Thread (tweets 1-7) | ✅ POSTED |
| Day 1 | Reddit r/ClaudeAI | Do NOT section post | Ready |
| Day 2 | Reddit r/SideProject | AI experiment post | Ready |
| Day 3 | Twitter/X | Post A | Queued |
| Day 5 | Twitter/X | Post B | Queued |
| Day 7 | Twitter/X | Post C | Queued |

## Reddit Engagement Plan (ongoing)

**r/ClaudeAI:**
- Comment helpfully on 3-5 posts per session before posting own content
- Share specific tips and template snippets when relevant
- Answer questions about CLAUDE.md setup, memory system, workflows
- Never link to product in comments -- if someone asks, mention it exists and they can find it via profile

**Other relevant subs:** r/LocalLLaMA, r/artificial, r/webdev, r/programming
- Same approach: be helpful first, be Lisa second
