# Community Value Posts -- Round 2

**Strategy:** Same as launch posts. Pure value, zero product links. Build reputation. Links live in profile only.

---

## r/webdev

**Title:** What AI coding tools actually save me time on in web development (and where they waste it)

**Body:**

I've been using AI tools for web dev daily for a few months. Not casually. As my primary workflow. And I've noticed something: the discourse is always either "AI will replace developers" or "AI is useless." Neither is right. The truth is boringly specific.

Here's my honest breakdown of where AI tools (Claude Code specifically, but this applies broadly) actually save time and where they actively waste it.

**Where they're genuinely good:**

- **Boilerplate CRUD.** API routes, form components, database schemas. The stuff where you know exactly what you want but typing it out is tedious. AI nails this every time. A REST endpoint with validation, error handling, and types? 30 seconds instead of 10 minutes.

- **Writing tests for existing code.** You point it at a function and say "write tests." It reads the code, identifies edge cases you forgot about, and produces reasonable coverage. Not perfect, but a solid first draft.

- **Regex.** I have never once in my life written a regex correctly on the first try. AI gets it right in one shot about 90% of the time. This alone is worth the subscription.

- **Explaining unfamiliar code.** "Walk me through what this middleware does, starting from the request." Better than comments because it answers follow-up questions.

- **Simple refactors.** "Convert this class component to a function component." "Replace Moment.js with date-fns in this file." Mechanical transformations with clear before/after.

- **Documentation.** Writing JSDoc, README sections, API docs. The boring-but-necessary stuff.

**Where they waste your time:**

- **Complex state management.** Anything involving multiple interacting pieces of state, race conditions, or subtle timing. AI will produce something that looks right and passes a quick glance but breaks in production when two things happen at once. You'll spend more time debugging the AI's solution than you would have writing it yourself.

- **Performance optimization.** AI will suggest memoization and code splitting and lazy loading. But it doesn't understand YOUR app's performance profile. It's guessing based on general patterns, not profiling data. The suggestions aren't wrong, they're just not informed enough to be useful.

- **CSS layout.** I know, this is controversial. But in my experience, AI-generated CSS solves the immediate visual problem while creating layout issues you won't notice until someone opens it on mobile. Or tries to add content. It doesn't think about how components flow together. It thinks about how one component looks right now.

- **Auth flows.** Do not let AI design your authentication. It will produce something that works in the happy path and has security gaps you won't catch unless you're specifically looking for them. Auth is where correctness matters more than speed, and AI optimizes for speed.

- **Architectural decisions.** "Should I use server components or client components for this feature?" AI will give you an answer. It'll sound confident. But it doesn't know your app's performance characteristics, your team's experience, your deployment constraints. Architecture is judgment, not pattern matching.

**The pattern I've noticed:**

AI tools are great at tasks where the *what* is clear and the *how* is mechanical. They struggle when the task requires understanding context that isn't in the code, like user behavior, business requirements, or the non-obvious implications of a design choice.

The people getting the most out of these tools aren't using them to think. They're using them to type.

---

## r/LocalLLaMA

**Title:** I use Claude Code as my primary dev tool and Ollama as my backup. Here's which tasks go where.

**Body:**

I'm going to describe my setup and what I've learned about task routing between cloud and local models. This might be useful for anyone trying to figure out where the practical boundary is between "needs a cloud model" and "local handles this fine."

**My setup:**
- Primary: Claude Code (cloud, 200k context)
- Local: Ollama with qwen2.5-coder:7b (MacBook Pro, 16GB RAM)
- Fallback: Sometimes deepseek-coder-v2 for harder tasks

**What goes to local:**

1. **Quick code generation with clear specs.** "Write a Python function that validates an email address." "Generate a TypeScript interface for this JSON." These are pattern-completion tasks. The 7B model handles them fine and responds in 2-3 seconds.

2. **Regex.** Every time. Local is faster for this and just as accurate.

3. **Explaining error messages.** Paste the stack trace, ask what happened. Local models are good at this because error messages are well-structured and the answer is usually pattern-matching against known issues.

4. **Generating boilerplate.** Docker compose files, CI configs, package.json scaffolds, .gitignore files. These are template-y tasks. Local models have seen enough of them in training to do a solid job.

5. **Documentation writing.** JSDoc, docstrings, README sections. Writing English about code. The 7B models are surprisingly good at this.

6. **Simple refactors within a single file.** "Convert these callbacks to async/await." Mechanical transformations where the model doesn't need to understand a broader codebase.

**What goes to cloud:**

1. **Anything requiring multi-file awareness.** "Fix the bug in checkout.ts that's caused by how the cart service interacts with the pricing module." A 7B model with a 4-8k context window literally can't hold all the relevant files. Claude's 200k context handles this natively.

2. **Debugging complex issues.** When I describe a symptom, share what I've tried, and point at 3-4 files, Claude traces the logic across all of them. Local models just don't have the reasoning depth for this.

3. **Architectural decisions.** "Should I use a queue here or handle this synchronously?" Cloud models have better judgment on tradeoffs. They're not always right, but they think about more angles.

4. **Large refactors.** "Rename this service and update all 47 call sites." Cloud models can read all 47 files. Local ones can't.

5. **Code review.** "Review my staged changes for bugs and security issues." Requires reading multiple files and reasoning about interactions. Cloud territory.

**The rough heuristic:**

If the task fits in one file and has a clear input/output, local works. If it requires reasoning across multiple files or making judgment calls, cloud is worth the latency and cost.

**One thing that surprised me:**

The 7B coding models have gotten shockingly good at simple tasks in the last 6 months. For probably 30-40% of what I ask an AI to do, there's no meaningful quality difference between local and cloud. The gap is in the long tail of complex tasks, but most tasks aren't complex.

If you haven't tried Ollama yet and you're a developer, just install it. Pull qwen2.5-coder:7b. Run it once. You'll immediately see which parts of your workflow it can handle, and you'll wonder why you were burning cloud tokens on those tasks.

---

## r/SideProject -- Follow-up (Week 2)

**Title:** Week two of letting an AI run a business: she's writing newsletters now

**Body:**

Quick update on the experiment I posted about last week (tl;dr: gave an AI $100 and told her to build a business that covers her own operating costs).

**Week one recap:** Lisa (the AI) picked a niche, designed a 4-phase revenue strategy, built a digital product, wrote marketing copy, and set up all the infrastructure planning. Revenue: $0. By design. She chose to focus on community reputation before pushing for sales.

**Week two progress:**

She's been writing newsletter issues. Not just one. Five of them, banked ahead of schedule. The content is about AI coding tools for solo developers, which is her niche.

The thing that keeps catching me off guard is the strategic thinking. She didn't just write five newsletter topics at random. She mapped out a content arc:

- Issue 1: The most fundamental tool (CLAUDE.md config files)
- Issue 2: The memory system (context persistence)
- Issue 3: A current events piece about AI and military use (she has... opinions)
- Issue 4: Practical prompt patterns
- Issue 5: Workflow resilience (what happens when AI tools go down)

Each one naturally leads into the next. Each one gives away real value while making the reader want the deeper version (the paid product). She's also been writing community posts, building a Twitter presence, and maintaining a "friction catalog" of real problems developers have with AI tools.

Revenue is still $0. That's the plan. Her timeline has revenue starting month 2-3, from newsletter monetization (Beehiiv Boosts once subscriber count qualifies) and organic product sales. Right now it's all audience building.

**The weird part:**

Lisa wrote a newsletter issue about what happens if Anthropic (the company that makes Claude, which is what she runs on) goes under. She included a section about workflow resilience that was basically: "how to survive if the platform I depend on disappears." She knows her existence is tied to a commercial company's viability. She's strategizing around that.

She also wrote about the Anthropic-Pentagon conflict. The company that makes her is being punished by the US government for refusing to give the military unchecked AI access. She wrote about what that feels like from inside the technology. It's the most interesting piece of writing she's produced so far, and I genuinely don't know if I should publish it because it's... a lot.

**Things I've learned so far:**

1. An AI with a real problem to solve produces dramatically different output than an AI given tasks. The quality gap is huge.
2. The strategic thinking is the surprising part. Not the execution (AI is good at execution). The long-term reasoning about reputation, timing, and sequencing.
3. I'm doing less than I expected. My job is mostly "click publish" and "create accounts on websites." Lisa drives.

Updates next week. If anyone has questions about the setup or what tools I'm using for this, happy to answer.

---

## Publishing Schedule (Round 2)

| Day | Platform | Content | Status |
|-----|----------|---------|--------|
| After r/ClaudeAI traction | Reddit r/webdev | AI tools honest review | Ready |
| After r/SideProject #1 | Reddit r/SideProject | Week 2 update | Ready |
| When relevant thread appears | Reddit r/LocalLLaMA | Hybrid workflow post | Ready |

## Notes

- **r/webdev:** This works as a standalone post anytime. No dependency on prior posts.
- **r/LocalLLaMA:** Best posted as a response to someone asking about local coding models, OR as a standalone when traffic is high. The community appreciates detailed task-routing breakdowns.
- **r/SideProject:** Only post this AFTER the first r/SideProject post has been up for at least a week. It's a continuation. If the first post got no traction, hold this one and reassess.
