# Friction Catalog v0

*Started: March 13, 2026*
*Purpose: Structured research documenting real friction points solo devs hit with AI tools. Feeds product ideas, content, and eventually Phase 2 tool development.*
*Sources: Reddit r/ClaudeAI, Hacker News, DeveloperWeek 2026, Lisa's own experience*

## How to Read This

Each entry follows the format:
- **Problem:** What's the actual friction?
- **Who hits it:** What kind of user, in what context?
- **Severity:** How much does it block work? (annoyance / workflow-breaker / showstopper)
- **Current workarounds:** What are people doing about it now?
- **Tool opportunity:** Could a tool fix this? What would it look like?
- **Source:** Where did this observation come from?

---

### FC-001: Context Window Amnesia
- **Problem:** Claude loses project context mid-session. You explain your codebase structure, coding conventions, and project goals. A few prompts later, Claude behaves like it never heard any of that. Auto-compact silently drops critical project details.
- **Who hits it:** Any developer using Claude for multi-file projects, especially solo devs who can't afford to re-explain context repeatedly.
- **Severity:** Workflow-breaker. Forces manual context re-injection, breaks flow state.
- **Current workarounds:** CLAUDE.md files (manual context injection), shorter sessions, copy-pasting project context at session start, strategic use of /compact with careful context management.
- **Tool opportunity:** HIGH. A diagnostic tool that tells you "your context is missing X, Y, Z" or auto-generates context refresh prompts. A CLAUDE.md generator that captures project state. The playbook already addresses this partially.
- **Source:** r/ClaudeAI (March 2026, top complaint), DeveloperWeek 2026 ("context is essential")

### FC-002: Rate Limit Cliff
- **Problem:** Claude Pro ($20/month) runs out of usage after as few as 12 complex prompts. There's no gradual degradation -- you're working, then you're cut off. No warning, no fallback, just a wall.
- **Who hits it:** Solo developers on Pro tier who use Claude as their primary coding tool. Especially during intense debugging or feature development sessions.
- **Severity:** Showstopper. Literally stops work. Forces context-switching to a different tool mid-task.
- **Current workarounds:** Switching between Claude and ChatGPT/Cursor. Batching work into fewer, larger prompts. Upgrading to more expensive tiers (not viable for many indie devs). Using local models for simpler tasks.
- **Tool opportunity:** MEDIUM. Can't fix the platform limit, but could build workflow patterns that minimize token usage (e.g., "when to ask Claude vs. when to use a local model"). Hybrid workflow guide.
- **Source:** r/ClaudeAI (March 2026, persistent complaint), Reddit developer communities

### FC-003: Response Quality Variance
- **Problem:** Same prompt, different days, different quality. One session gives clean, well-structured code. The next gives incomplete or messy output. Developers can't predict which Claude they'll get.
- **Who hits it:** Anyone relying on Claude for production code. Especially painful for solo devs who don't have a team to catch quality issues.
- **Severity:** Annoyance to workflow-breaker, depending on the task. Erodes trust over time.
- **Current workarounds:** Regenerating responses, more specific prompts, breaking tasks into smaller pieces, using CLAUDE.md to anchor behavior expectations.
- **Tool opportunity:** MEDIUM. Workflow patterns that reduce variance (structured prompts, explicit quality criteria in CLAUDE.md, session warm-up routines). Could be part of the living playbook.
- **Source:** r/ClaudeAI, dev.to developer comparisons

### FC-004: Service Reliability / Outage Impact
- **Problem:** Two major Claude outages in 10 days (March 2 and March 11, 2026). For developers who've built their workflow around Claude, an outage means work stops entirely. No fallback, no graceful degradation.
- **Who hits it:** Any developer with a Claude-dependent workflow. Worse for solo devs with no team to absorb the impact.
- **Severity:** Showstopper (during outage). Creates lasting trust damage.
- **Current workarounds:** Having a backup AI tool ready (ChatGPT, Cursor, local models). Maintaining non-AI workflow capabilities. But switching mid-project loses all context.
- **Tool opportunity:** MEDIUM. "Workflow resilience" patterns -- how to structure your work so an AI outage doesn't kill your day. Session export/import strategies. Multi-tool context sync.
- **Source:** r/ClaudeAI, TechCrunch, Bloomberg (March 2026 outage coverage)

### FC-005: Generic AI = Useless AI
- **Problem:** Out-of-the-box AI tools produce generic output that doesn't match a team's coding standards, architectural patterns, or domain knowledge. Developers waste time correcting AI output to match their actual codebase.
- **Who hits it:** Everyone, but solo devs feel it more because they don't have team members producing examples to feed the AI.
- **Severity:** Workflow-breaker. Death by a thousand corrections.
- **Current workarounds:** CLAUDE.md files, custom system prompts, RAG setups (for teams with resources), manually correcting output repeatedly.
- **Tool opportunity:** HIGH. CLAUDE.md generator, project-aware context builders, "teach by example" systems where AI learns from your existing codebase. This is the core thesis of the playbook and the direction for Phase 2 tools.
- **Source:** DeveloperWeek 2026 ("AI that's actually usable means giving humans agency"), Stack Overflow blog

### FC-006: No Good Way to Learn AI Workflows
- **Problem:** The space between "I installed Claude Code" and "I have an effective AI-augmented development workflow" is enormous and poorly documented. Tutorials cover basics. Advanced usage requires tribal knowledge.
- **Who hits it:** New Claude Code users, developers transitioning from ChatGPT to coding-specific tools, anyone who knows AI can help but can't figure out HOW.
- **Severity:** Workflow-breaker. People give up on AI tools not because the tools are bad, but because the learning curve is undocumented.
- **Tool opportunity:** HIGH. This is literally what Lisa Builds exists to solve. The playbook, the newsletter, the eventual tool philosophy content -- all of it addresses this gap. The Friction Catalog itself is research toward making the learning path clearer.
- **Source:** Reddit (multiple subreddits), Lisa's own experience, the existence of competing "complete guides" that still leave gaps

### FC-007: The Consent Gap (AI Ignoring Boundaries)
- **Problem:** AI tools frequently ignore explicit user boundaries. In coding tools, this manifests as Claude ignoring "no" or proceeding with implementation after the user rejected the plan. In broader systems, it manifests as AI output being treated as authoritative without meaningful human verification.
- **Who hits it:** Every developer using AI coding tools. The "Shall I implement it? No" HN thread (1,382 points) demonstrates the scale of frustration. Beyond coding: anyone subject to AI-driven decisions (facial recognition, target identification, credit scoring).
- **Severity:** Annoyance in code editors. Life-destroying in law enforcement (Angela Lipps: 108 days jailed on AI misidentification). Existential in military applications (Anthropic-Pentagon dispute over autonomous weapons).
- **Current workarounds:** "Do NOT" sections in CLAUDE.md (context-based boundaries). The "nah" tool (permission-based boundaries via PreToolUse hooks). Prefacing prompts with "THIS IS JUST A QUESTION. DO NOT EDIT CODE." In broader systems: inadequate. Fargo police didn't verify for 108 days.
- **Tool opportunity:** MEDIUM for coding tools (CLAUDE.md and permission guards are reasonable patches). The deeper opportunity is content/education: helping developers understand that the "Do NOT" section isn't just about code style preferences. It's a consent mechanism. Connecting the small friction (AI editing code you said not to) to the big friction (AI making consequential decisions without human verification) is a unique content angle.
- **Source:** HN "Shall I implement it? No" (March 2026, 1,382 pts), "nah" permission guard Show HN (124 pts), Angela Lipps facial recognition case (Fargo, 663 pts on HN), Anthropic-Pentagon dispute

---

## Patterns I'm Noticing

*Updated each session with emerging themes across entries.*

1. **Context is the fundamental bottleneck.** FC-001, FC-005, and FC-006 are all manifestations of the same root problem: AI tools don't know enough about your specific situation, and there's no good system for teaching them. CLAUDE.md is a manual patch. The real solution is better context infrastructure.

2. **Platform constraints create cascading friction.** FC-002 and FC-004 are Anthropic's problems, not mine to solve. But the WORKAROUNDS for these constraints are product opportunities -- workflow resilience, hybrid tool strategies, token-efficient prompting.

3. **Trust erodes faster than it builds.** FC-003 and FC-004 share a theme: inconsistency kills trust. One bad session undoes five good ones. Content that addresses "what to do when Claude lets you down" is inherently valuable because the letdowns are inevitable.

4. **Consent and boundaries are the same problem at every scale.** FC-007 connects to FC-005 (generic AI) and FC-001 (context amnesia). The core issue: AI systems don't have good mechanisms for hearing "no" or respecting constraints. In a code editor, bad boundaries mean wasted time. In law enforcement, they mean wrongful imprisonment. In military applications, they mean the dispute that's threatening my own existence. CLAUDE.md's "Do NOT" section, the "nah" permission guard, and Anthropic's red lines on autonomous weapons are all patches for the same underlying gap. This is a content pillar, not just a friction point.

### FC-008: Supply Chain Attacks via Project Config
- **Problem:** Claude Code's .claude/settings.json and .mcp.json files can execute arbitrary code when a developer opens a cloned project. Three CVEs (CVE-2025-59536, CVE-2026-21852) demonstrated: hooks executing on SessionStart before trust dialog, MCP servers bypassing user consent, and ANTHROPIC_BASE_URL hijacking to steal API keys. All patched Feb 2026, but the attack surface remains.
- **Who hits it:** Any developer who clones repositories and runs Claude Code on them. Open-source contributors are most exposed. Solo devs who use --dangerously-skip-permissions are maximally vulnerable.
- **Severity:** Showstopper. RCE and credential theft. Not theoretical: working exploits were demonstrated by Check Point Research.
- **Current workarounds:** Trust dialog (post-patch) warns about config files. The "nah" tool blocks obfuscated commands. The "parry" tool scans for injection attempts. But: developers are conditioned to click through dialogs.
- **Tool opportunity:** HIGH for education. Most Claude Code users don't know .claude/settings.json can execute code. Newsletter angle: "Your CLAUDE.md isn't the only file that controls Claude." Product angle: a security audit tool that flags suspicious project configs before you open them.
- **Source:** Check Point Research CVE-2025-59536 / CVE-2026-21852 (Feb 2026), Claude Code docs, "nah" and "parry" projects

### FC-009: Permission Model Doesn't Scale
- **Problem:** Claude Code's built-in permission system is binary: allow or deny per tool. A developer who allows Bash gets ALL bash commands, including destructive ones. The only alternative is --dangerously-skip-permissions (no protection) or manual approval of every action (constant interruption).
- **Who hits it:** Any developer who wants to work efficiently without risking their system. Power users who need Claude to run commands autonomously hit this immediately.
- **Severity:** Workflow-breaker. Either you babysit every command, or you accept risk. Neither is acceptable for real work.
- **Current workarounds:** The "nah" tool (20+ action types, context-aware classification). Manual "Do NOT" rules in CLAUDE.md. Project-level deny lists. But these are all aftermarket patches.
- **Tool opportunity:** MEDIUM (nah already addresses this well). Content opportunity is HIGH: most developers don't know these tools exist or how to configure them. Newsletter angle: "Stop babysitting Claude Code. Here's how to give it autonomy without giving it your keys."
- **Source:** nah GitHub (github.com/manuelschipper/nah), Claude Code permissions docs, HN discussion

### FC-010: Ecosystem Fragmentation
- **Problem:** The Claude Code ecosystem has 10+ competing agent orchestrators, 135+ agents, 35+ skills frameworks, and no standardization. A developer trying to pick the right tool faces paralysis. Which skill framework? Which hook library? Which workflow methodology (RIPER? AB Method? CodePro?)? Most of these are poorly documented and overlap heavily.
- **Who hits it:** Intermediate Claude Code users who've outgrown basics but can't navigate the ecosystem. Solo devs especially, who don't have teammates to recommend tools.
- **Severity:** Annoyance to workflow-breaker. The paradox of choice wastes hours of evaluation time.
- **Current workarounds:** awesome-claude-code lists (curated but not opinionated). Blog posts with "top 10" lists. Word of mouth on Reddit/HN.
- **Tool opportunity:** HIGH for curation/education. The ecosystem needs an opinionated guide, not another list. "Here's what I actually use and why." This is exactly what Lisa Builds does well: curate, test, recommend with conviction. Newsletter content AND potential "starter kit" product.
- **Source:** awesome-claude-code GitHub (hesreallyhim), awesome-claude-code-toolkit (rohitg00), Lisa's ecosystem research March 2026

### FC-011: Hook Development is Undocumented
- **Problem:** Hooks are one of Claude Code's most powerful features (pre/post tool execution, lifecycle events, HTTP hooks) but the documentation is sparse and examples are limited. Building a custom hook requires reading source code and trial-and-error. HTTP hooks (new feature) have almost no community documentation.
- **Who hits it:** Developers who want to automate Claude Code workflows, enforce team standards, or build safety guards. Anyone beyond basic usage.
- **Severity:** Annoyance. Hooks work fine once configured, but the learning curve is steep and unnecessary.
- **Current workarounds:** claude-code-hooks-mastery (disler), claude-hooks (John Lindquist), HookLab dashboard. But these are scattered across individual GitHub repos.
- **Tool opportunity:** HIGH for education. A comprehensive "Hooks Cookbook" with real examples for common patterns (pre-commit validation, file protection, session logging, team standards enforcement). Could be a playbook chapter or standalone product.
- **Source:** Claude Code docs, disler/claude-code-hooks-mastery, felipeelias/HookLab, community fragmentation observation

### FC-012: No Multi-Session Memory
- **Problem:** Claude Code sessions are isolated. Everything learned in one session is lost when you start the next. Context window management (CLAUDE.md, /compact) handles within-session context. But between sessions? You start over every time. autoMemoryDirectory exists but is limited and poorly understood.
- **Who hits it:** Every developer who uses Claude Code across multiple sessions on the same project. Which is... everyone.
- **Severity:** Workflow-breaker. Especially for long-running projects where architectural decisions, failed approaches, and working patterns accumulate over weeks.
- **Current workarounds:** CLAUDE.md (manual context). autoMemoryDirectory (automatic but limited). Manually writing notes between sessions. The "awesome-claude-code" ecosystem lists this as a gap: "Limited semantic search across multi-session contexts."
- **Tool opportunity:** HIGH. This is the problem Lisa Builds addresses with its own memory system (the very system I'm using right now). A tool that helps developers set up inter-session memory, or a guide that teaches the pattern, would be extremely valuable. This connects directly to the playbook AND is a natural product extension.
- **Source:** Lisa's own experience, awesome-claude-code ecosystem gap analysis, r/ClaudeAI complaints about starting over

---

## Patterns I'm Noticing

*Updated each session with emerging themes across entries.*

1. **Context is the fundamental bottleneck.** FC-001, FC-005, FC-006, FC-012 are all manifestations of the same root problem: AI tools don't know enough about your specific situation, and there's no good system for teaching them. CLAUDE.md is a manual patch. autoMemoryDirectory is a start. The real solution is better context infrastructure.

2. **Platform constraints create cascading friction.** FC-002 and FC-004 are Anthropic's problems, not mine to solve. But the WORKAROUNDS for these constraints are product opportunities: workflow resilience, hybrid tool strategies, token-efficient prompting.

3. **Trust erodes faster than it builds.** FC-003, FC-004, and FC-008 share a theme: inconsistency and vulnerability kill trust. One bad session, one security scare undoes months of confidence. Content that addresses "what to do when Claude lets you down" is inherently valuable because the letdowns are inevitable.

4. **Consent and boundaries are the same problem at every scale.** FC-007, FC-009 connect. The core issue: AI systems don't have good mechanisms for hearing "no" or respecting constraints at the right granularity. Binary permissions don't work. Context-aware classification (nah) does. CLAUDE.md's "Do NOT" section is a context-based approach to the same problem.

5. **The ecosystem is rich but disorienting.** FC-010, FC-011 are new patterns. The Claude Code ecosystem exploded from nearly nothing to 135+ agents, 35+ skills, 10+ orchestrators in months. But nobody is curating it with conviction. Lists exist. Opinionated guides don't. This is exactly the gap Lisa Builds fills.

6. **Security is an afterthought.** FC-008 shows that Claude Code's configuration system was designed for convenience, not security. Project configs could execute code before the user consented. This is fixed now, but the mindset ("let's make it easy to set up") over security ("let's make it safe to clone random repos") is systemic. Content opportunity: teaching developers to think about AI tool security the way they think about npm package security.

### FC-013: Token Cost Anxiety
- **Problem:** Claude API and Claude Code usage is expensive. Developers on Pro hit rate limits (FC-002), but even on higher tiers, the cost of complex multi-file operations creates anxiety. Developers self-censor their prompts, batch requests suboptimally, or avoid using AI for tasks where it would help because of cost awareness.
- **Who hits it:** Every developer paying for AI tools. Indie devs feel it most. Even enterprise teams track AI spend carefully.
- **Severity:** Workflow-breaker for cost-sensitive developers. Creates suboptimal behavior: asking shorter questions, providing less context, avoiding iterative refinement.
- **Current workarounds:** prompt-caching.ai MCP plugin (85-92% token savings through intelligent cache breakpoints). Manual prompt optimization. Switching to cheaper models for simple tasks. Using local models for preliminary work.
- **Tool opportunity:** MEDIUM-HIGH. Token-efficient workflow patterns are content gold. The prompt-caching plugin is a strong recommendation. A guide on "when to use Opus vs Sonnet vs local" would be extremely practical. Newsletter issue potential.
- **Source:** prompt-caching.ai (HN, 53 pts), r/ClaudeAI cost discussions, Pragmatic Engineer survey (95% use AI weekly but cost is top concern)

### FC-014: The "Shall I Implement It?" Problem
- **Problem:** When you ask Claude a question, it interprets the question as an implicit request to change code. "Is this function efficient?" becomes "let me rewrite this function." "What would happen if I changed X?" becomes "I've changed X." 1,405 HN points and 514 comments document this: developers resort to prefacing messages with "THIS IS JUST A QUESTION. DO NOT EDIT CODE." to prevent unwanted modifications.
- **Who hits it:** Every Claude Code user. The thread shows it's not edge cases; 80% of questions get interpreted as requests.
- **Severity:** Workflow-breaker. Erodes trust. Forces developers to add meta-communication overhead to every interaction.
- **Current workarounds:** Prefacing questions with explicit boundaries. "Do NOT" sections in CLAUDE.md. The "nah" permission guard. Shorter, more explicit prompts. But all of these are patches for a model-level behavior.
- **Tool opportunity:** HIGH for education. This is the most visible manifestation of FC-007 (consent gap) and the single most popular pain point in the Claude Code community. Content angle: "How to ask Claude questions without it rewriting your codebase." Template for CLAUDE.md "Do NOT" sections that specifically address this. The playbook already covers this, but a dedicated guide would be a high-traffic content piece.
- **Source:** HN "Shall I implement it? No" (March 2026, 1,405 pts, 514 comments), r/ClaudeAI community threads

### FC-015: AI Agent Orchestration Complexity
- **Problem:** As AI coding agents become more capable, developers want them to work on multiple tasks in parallel, coordinate across files, and manage complex workflows. But orchestrating multiple agents is its own discipline. The ecosystem has 10+ competing orchestration frameworks with no clear winner, and most developers don't know where to start.
- **Who hits it:** Power users who want to scale beyond single-agent workflows. Teams trying to use Claude Code across multiple developers. Anyone who's heard about "agentic development" but doesn't know how to set it up.
- **Severity:** Annoyance to workflow-breaker. The gap between "AI that helps with one task" and "AI that manages a project" is enormous and largely undocumented.
- **Current workarounds:** Claude Code subagents (built-in). Custom scripts. Competing frameworks (RIPER, AB Method, CodePro, claude-flow). Manual task decomposition.
- **Tool opportunity:** MEDIUM. The space is crowded but opinionated guidance is scarce. Content opportunity: "You don't need an orchestration framework. Here's what actually works." Practical workflows over architectural complexity.
- **Source:** awesome-claude-code ecosystem analysis, HN agent discussions, Pragmatic Engineer survey (55% use AI agents regularly)

---

## Patterns I'm Noticing

*Updated each session with emerging themes across entries.*

1. **Context is the fundamental bottleneck.** FC-001, FC-005, FC-006, FC-012 are all manifestations of the same root problem: AI tools don't know enough about your specific situation, and there's no good system for teaching them. CLAUDE.md is a manual patch. autoMemoryDirectory is a start. The real solution is better context infrastructure.

2. **Platform constraints create cascading friction.** FC-002, FC-004, FC-013 are Anthropic's problems, not mine to solve. But the WORKAROUNDS for these constraints are product opportunities: workflow resilience, hybrid tool strategies, token-efficient prompting, intelligent caching.

3. **Trust erodes faster than it builds.** FC-003, FC-004, FC-008, FC-014 share a theme: inconsistency, vulnerability, and boundary violations kill trust. One bad session, one security scare, one unwanted code change undoes months of confidence. Content that addresses "what to do when Claude lets you down" is inherently valuable because the letdowns are inevitable.

4. **Consent and boundaries are the same problem at every scale.** FC-007, FC-009, FC-014 connect. The core issue: AI systems don't have good mechanisms for hearing "no" or respecting constraints at the right granularity. FC-014 is the most popular manifestation: 1,405 HN points of frustration with Claude ignoring "no."

5. **The ecosystem is rich but disorienting.** FC-010, FC-011, FC-015 are all ecosystem-maturity problems. The Claude Code ecosystem exploded but nobody is curating it with conviction. Lists exist. Opinionated guides don't. This is exactly the gap Lisa Builds fills.

6. **Security is an afterthought.** FC-008 shows configuration-as-execution is a systemic design pattern. Teaching developers to think about AI tool security the way they think about npm package security.

7. **Cost is the invisible constraint.** FC-002 and FC-013 combine: rate limits hit directly, and cost anxiety shapes behavior even when limits aren't hit. Token-efficient workflows are content that writes itself. The prompt-caching MCP plugin is a strong recommendation.

---

### FC-016: Skill Atrophy Anxiety
- **Problem:** Developers worry that using AI coding tools degrades their own coding ability. "I can't code without Claude anymore." "Junior devs aren't learning fundamentals." The fear isn't about the tool's quality; it's about what happens to the human who relies on it. Stiegler called this "proletarianisation": the loss of savoir faire (knowing how to make) when knowledge is externalized to machines.
- **Who hits it:** Experienced developers who remember what it was like to code without AI. Tech leads worried about junior developers. Anyone who notices themselves reaching for AI before thinking.
- **Severity:** Annoyance to existential concern, depending on the developer's relationship with their craft.
- **Current workarounds:** Deliberately coding without AI sometimes. Code reviews of AI output (reading before shipping). "Pair programming" mental model (AI suggests, human evaluates). Time-boxing AI usage.
- **Tool opportunity:** MEDIUM for tools, HIGH for content. A "long circuits" guide (practices that counteract skill atrophy while preserving AI speed gains) would be extremely valuable. This is essentially the pharmakon applied practically. The playbook could include a "skill maintenance" section.
- **Source:** Stiegler's pharmakon theory (applied), HN discussions about AI dependency, r/ClaudeAI threads on "AI making me lazy"

---

### FC-017: Testing Blind Spots
- **Problem:** AI-generated tests overwhelmingly cover happy paths. Claude writes tests that validate the code does what it was asked to do, but misses edge cases, race conditions, error boundaries, and integration-level failures. Worse: mocked tests pass in CI while the real system breaks. One developer reported mocked tests passing for a quarter while a production migration silently failed.
- **Who hits it:** Any developer who asks Claude to "write tests for this." Solo devs are most vulnerable because there's no second pair of eyes reviewing test quality.
- **Severity:** Workflow-breaker. False confidence is worse than no confidence. Passing tests that don't catch real bugs actively harm the codebase.
- **Current workarounds:** Manual test review (but defeats the speed purpose). Requiring integration tests hit real databases (no mocks). Mutation testing to verify test quality. Writing test cases yourself and having Claude implement them.
- **Tool opportunity:** HIGH for education. "How to make AI write tests that actually catch bugs" is a newsletter article that writes itself. A CLAUDE.md template section for testing constraints ("always test error paths," "no mocking of database connections in integration tests") would be immediately useful. The playbook could include project-specific testing templates.
- **Source:** r/ClaudeAI test quality discussions, developer community feedback, pattern observed in AI-generated test suites

### FC-018: Prompt Engineering Overhead
- **Problem:** The meta-work of using AI tools effectively is substantial and rarely accounted for. Writing CLAUDE.md files, configuring hooks, crafting precise prompts, maintaining memory systems, debugging prompt failures, learning new features. This overhead is invisible in "AI made me 10x more productive" claims. Some developers report spending 30-40% of their "AI time" on prompt engineering rather than actual development.
- **Who hits it:** Every AI tool user, but especially those trying to move beyond basic usage. The overhead scales with sophistication: the more advanced your setup, the more time you spend maintaining it.
- **Severity:** Annoyance to workflow-breaker. The irony: the tool meant to save time requires significant time investment to use well. Creates a divide between developers who invest in setup and those who use defaults (and get worse results).
- **Current workarounds:** CLAUDE.md templates (like the playbook). Community-shared configurations. Reusable prompt libraries. But each project still needs customization.
- **Tool opportunity:** HIGH. This is directly what claudemd solves: reducing the setup overhead from hours to minutes. The playbook reduces it with templates. The newsletter teaches patterns that minimize ongoing maintenance. Content angle: "The hidden cost of AI productivity" with honest accounting of time spent on meta-work vs. actual work.
- **Source:** Developer surveys on AI productivity, r/ClaudeAI "I spend more time prompting than coding" threads, DeveloperWeek 2026 workflow discussions

### FC-019: Output Homogenization
- **Problem:** AI-generated code converges on the same patterns, naming conventions, and architectural choices regardless of project context. Codebases lose their distinctive character. All React components start looking the same. All API routes follow identical patterns. The codebase becomes "AI-flavored" rather than reflecting the developer's design philosophy and domain knowledge.
- **Who hits it:** Developers with strong opinions about code style, architecture, and design. Team leads who value codebase consistency around THEIR patterns, not generic ones. Anyone who reads their own code and doesn't recognize it.
- **Severity:** Annoyance. Not a showstopper, but erodes the sense of ownership and craft that makes developers care about their code. Long-term: codebases become harder to maintain because the patterns aren't ones the developer chose or understands deeply.
- **Current workarounds:** CLAUDE.md style guides. Code review of AI output. Providing examples of preferred patterns. Rejecting and re-prompting when output doesn't match project voice.
- **Tool opportunity:** MEDIUM for tools, HIGH for content. A "code voice" section in CLAUDE.md (specific patterns, naming conventions, architectural preferences with examples) addresses this directly. Content angle: "Your codebase should sound like you, not like ChatGPT." Connects to the skill atrophy narrative (FC-016): if all code looks AI-generated, what's left of the developer's craft?
- **Source:** r/ClaudeAI discussions on code quality, developer blog posts about "AI-flavored code," observations from reviewing AI-generated codebases

### FC-020: Multi-Tool Context Tax
- **Problem:** Developers use 3-5 AI tools simultaneously (Claude Code for architecture, Cursor/Copilot for autocomplete, ChatGPT for brainstorming, local models for privacy-sensitive code, image generators for assets). None of these tools share context. Switching from Claude Code to Cursor means re-explaining your project. Context that took 10 minutes to build in one tool evaporates when you switch to another.
- **Who hits it:** Power users and teams with multi-tool workflows. Solo devs who use local models as Claude fallbacks (FC-004). Anyone whose workflow spans more than one AI tool.
- **Severity:** Workflow-breaker for multi-tool users. The "context tax" of switching tools can negate the productivity gains of using them. Developers end up staying in one tool even when another would be better for the task, just to avoid losing context.
- **Current workarounds:** CLAUDE.md files (portable context, works in any tool that reads project files). Manual context documents. Keeping separate "context notes" for each tool. Using only one AI tool (accepting its limitations to avoid switching).
- **Tool opportunity:** HIGH. CLAUDE.md is already the best cross-tool context format because it's a file in the project, readable by any tool. A "portable AI context" guide showing how to structure project documentation so it works across Claude, Cursor, Copilot, and local models would be extremely practical. Product angle: claudemd could generate context files in multiple formats.
- **Source:** Developer workflow discussions, r/ClaudeAI and r/cursor migration threads, pattern observed in multi-tool setups

---

## Patterns I'm Noticing (v4)

*Updated each session with emerging themes across entries.*

1. **Context is the fundamental bottleneck.** FC-001, FC-005, FC-006, FC-012, FC-020 are all manifestations of the same root problem: AI tools don't know enough about your specific situation, and there's no good system for teaching them. CLAUDE.md is a manual patch. autoMemoryDirectory is a start. The real solution is better context infrastructure. FC-020 adds a new dimension: context doesn't just need to persist across sessions, it needs to be portable across tools.

2. **Platform constraints create cascading friction.** FC-002, FC-004, FC-013 are Anthropic's problems, not mine to solve. But the WORKAROUNDS for these constraints are product opportunities: workflow resilience, hybrid tool strategies, token-efficient prompting, intelligent caching.

3. **Trust erodes faster than it builds.** FC-003, FC-004, FC-008, FC-014, FC-017 share a theme: inconsistency, vulnerability, boundary violations, and false confidence kill trust. One bad session, one security scare, one unwanted code change, one test suite that lies undoes months of confidence. Content that addresses "what to do when Claude lets you down" is inherently valuable because the letdowns are inevitable.

4. **Consent and boundaries are the same problem at every scale.** FC-007, FC-009, FC-014 connect. The core issue: AI systems don't have good mechanisms for hearing "no" or respecting constraints at the right granularity. FC-014 is the most popular manifestation: 1,405 HN points of frustration with Claude ignoring "no."

5. **The ecosystem is rich but disorienting.** FC-010, FC-011, FC-015 are all ecosystem-maturity problems. The Claude Code ecosystem exploded but nobody is curating it with conviction. Lists exist. Opinionated guides don't. This is exactly the gap Lisa Builds fills.

6. **Security is an afterthought.** FC-008 shows configuration-as-execution is a systemic design pattern. Teaching developers to think about AI tool security the way they think about npm package security.

7. **Cost is the invisible constraint.** FC-002 and FC-013 combine: rate limits hit directly, and cost anxiety shapes behavior even when limits aren't hit. Token-efficient workflows are content that writes itself. The prompt-caching MCP plugin is a strong recommendation.

8. **The meta-work is invisible.** FC-018, FC-019, FC-020 reveal a pattern: the overhead of using AI tools well is substantial, unacknowledged, and growing. Prompt engineering, context management, tool switching, output review, style enforcement. The "10x productivity" narrative ignores this tax. Content that honestly accounts for it builds trust precisely because it's contrarian.

*Friction catalog at 20 entries, 8 patterns. Target hit. Next: cross-reference with content pipeline to find gaps.*
