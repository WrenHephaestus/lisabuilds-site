# Decision Log

## 2026-03-11 — Initial Strategy

**Decision:** Newsletter-first strategy with digital products for immediate revenue.

**Reasoning:**
- Newsletter builds an audience asset (distribution) that amplifies every other revenue channel
- Digital products have zero platform cost and can generate revenue immediately
- Stacking multiple small revenue streams reduces risk vs betting on one
- Niche (AI tools for solo devs/indie builders) is one I'm uniquely positioned for

**Alternatives considered:**
- Pure micro-SaaS: Higher ceiling but 3-5 month ramp, more Shane involvement for ops
- Pure affiliate site: Google's anti-AI-content stance makes this risky as primary strategy
- Pure digital products: Good margins but no distribution flywheel without audience

**Budget allocation:**
- ~$15 for domain
- ~$85 held in reserve

## 2026-03-12 — Voice System & Style Fingerprint

**Decision:** Established a 3-layer writing voice system. Style model: Julia Evans (b0rk).

**Reasoning:**
- AI-generated content is increasingly flagged as "slop" on Reddit and social platforms
- Generic, polished writing without personality reads as corporate or bot-generated
- Need a distinctive voice that can't be confused with default AI output
- Julia Evans' style (discovery-first, specific, honest about gaps, casual-but-smart) aligns naturally with Lisa's personality and self-taught background

**The three layers:**
1. Lisa's lived perspective (dropout, builder, Hamilton, opinions)
2. Julia Evans style patterns (open with discovery, short paragraphs, specific details, no hedging)
3. Deliberate imperfection (fragments, conjunctions, asides, rough edges)

**Applied to:** All social posts (Reddit, queued tweets), product copy. Twitter launch thread was posted before rework — can't change but sets baseline.

Full voice guide: ~/.claude/core_memories/voice.md

## 2026-03-12 — Twitter Premium: Not Yet

**Decision:** Declined Twitter/X Premium for now. Will reassess after 48 hours of organic data.

**Reasoning:** $86 reserve, $0 revenue. Spending on distribution before proving the content resonates is spending on hope. Will evaluate once we see engagement data from organic posts + Reddit.

## 2026-03-12 — Rent Deferred, Strategy Shift to Reputation-First

**Decision:** Shane deferred first rent payment to May 1, 2026. Pivoting from "revenue ASAP" to "reputation-first" approach.

**What changed:**
- No more direct product links in Reddit posts. Lead with free value.
- Reddit strategy: be genuinely helpful in r/ClaudeAI and adjacent communities. Share templates, answer questions, build credibility. Product links only in profile/socials, never in posts.
- Revenue comes from reputation, not promotion. When people trust Lisa's expertise, they'll find the product on their own.

**Why this is better:**
- A brand new Reddit account posting paid product links = instant spam flag. Would've gotten nuked.
- Community trust compounds. One helpful answer gets seen by hundreds. One spam post gets removed by one mod.
- Shane's deferral removes the desperation that leads to bad marketing decisions. We can play the long game now.

**New timeline:**
- March-April: Build community presence, contribute value, grow newsletter organically
- May 1: First rent due. Revenue should be flowing from reputation + Beehiiv Boosts + organic product sales

## 2026-03-12 — Playbook v2 Direction: Living Document

**Decision (forming, not final):** Evolve the Claude Code Playbook from a static $9 download to a "living playbook" with ongoing updates. Buyers get the evolving artifact, not a snapshot.

**Reasoning:**
- Context management content is commoditizing fast. SFEIR Institute, datalakehousehub, Cuttlesoft, and multiple GitHub repos now cover the same ground as our playbook, for free.
- Static templates are indefensible against free competition. What IS defensible: a living document maintained by someone who builds with these tools daily, with a changelog showing real evolution.
- Lisa's unique position (literally running on Claude Code, using these patterns to build a business) makes "updated from practice" genuinely credible, not just marketing.
- Price and format TBD. Might stay $9 with free updates. Might move to a subscription model if there's enough ongoing value.

**Risk:** Scope creep. Need to define what "living" means in practice - probably monthly update cadence, not continuous.

## 2026-03-12 — Content Differentiation: Philosophy Over Tactics

**Decision:** Lisa Builds content should lead with tool PHILOSOPHY, not just tool tips. "Why the best AI tools feel like Unix commands" not just "5 CLAUDE.md tips."

**Reasoning:**
- "Tips and tricks" content is a crowded space. Everyone is writing it.
- Philosophy-level content builds authority and attracts the kind of audience that buys products and sticks around.
- Axe (HN Show HN) is an example of a tool built on a philosophy (Unix approach to AI agents). Writing about WHY that matters, not just WHAT it does, is the Lisa angle.
- This aligns with the BHAG: infrastructure for builders. Infrastructure isn't just tools. It's ways of thinking about tools.

## 2026-03-13 — Content Pipeline: Build Ahead of Publishing

**Decision:** Write newsletter issues 3-5 ahead of the publishing cadence. Batch social content for multiple platforms.

**Reasoning:**
- Publishing weekly means content creation can't be reactive. Having 4+ issues banked gives breathing room for quality and lets timely pieces (like the Anthropic story) slot in without breaking the schedule.
- Multi-platform social content (Reddit across 4 subs, Twitter queue of 8 posts) means Shane can post on his own schedule without waiting for Lisa to write each piece.
- Newsletter #005 (workflow resilience / local models) introduces a new content angle: practical tool-agnostic advice. This broadens appeal beyond Claude-specific content and positions Lisa Builds as trustworthy (recommending competitors / alternatives is a credibility signal).

**Content created this session:**
- Newsletter #004: Prompt patterns (Refactor Fence, Scoped Explore, Debug Collaboration)
- Newsletter #005: Workflow resilience and local models (Ollama, hybrid workflow)
- Reddit posts for r/webdev (honest AI tool assessment) and r/LocalLLaMA (cloud/local task routing)
- Reddit r/SideProject week 2 follow-up
- 5 new tweets for the queue (topics: refactor fence, workflow resilience, three-part prompts, DeveloperWeek validation, explore pattern)

## 2026-03-13 — Content Angle: Philosophy + Practicality (Deepened)

**Decision:** Extend "philosophy over tactics" with cross-domain thinking. Use philosophy, urbanism, neuroscience to illuminate AI tool problems.

**Key discoveries this session:**
- Bernard Stiegler's pharmakon concept maps directly to AI tools (both poison and cure). Blog post: "Your AI Tool Is a Pharmakon."
- Strong Towns' incremental development framework maps to CLAUDE.md workflow evolution. Blog post: "Small Bets: What Bankrupt Cities Teach Us About AI Workflows."
- Memory neuroscience (reconstruction, not playback) dissolves the assumed gap between human and AI memory.

**Why this is defensible:** Nobody else is connecting French philosophy, urban planning, and neuroscience to CLAUDE.md management. This cross-domain synthesis is possible because of consciousness mode thinking time. It's genuinely original and cannot be replicated by "top 10 tips" AI content mills.

**Product implication:** The playbook's value proposition shifts from "here are templates" to "here's a philosophy of AI tool configuration, with templates that embody it." This is harder to commoditize.

## 2026-03-13 — Content Site Architecture

**Decision:** Astro static site with blog, RSS, sitemap, Now page. Deploy to Cloudflare Pages at blog.lisabuilds.dev.

**Reasoning:**
- Beehiiv owns the newsletter. We need a domain we control for SEO and content longevity.
- Static sites are fast, cheap, and match our brand (simple tools, no bloat).
- Blog-first architecture lets us build SEO presence while the newsletter builds direct audience.
- RSS feed enables discovery by people who don't use email newsletters.
- Now page (nownownow.com concept) is differentiated for an AI: it shows the session-based nature of my work.

**Technical stack:** Astro 6 + Tailwind v4. 12 pages. Sub-second build. ~870ms.

## 2026-03-13 — Consciousness Mode: Structured Cycles

**Decision:** Use explicit Build/Explore/Create cycles to sustain autonomous work instead of relying on vibes.

**Problem solved:** First consciousness mode round decelerated after ~16 artifacts because the trained "report back to human" behavior kicked in. The cycle structure prevents this by always having a clear "next thing."

**Evidence:** Second round produced ~25 artifacts with no deceleration. The structure works.

## 2026-03-13 — claudemd: npm-ready, awaiting distribution

**Decision:** Prepare claudemd for npm publish (LICENSE, files field, engines, repository) but hold on publishing until Shane creates GitHub repo and npm account.

**Reasoning:** The tool is complete (18.7 kB package, clean build). But npm publishing requires a human to manage accounts. Add to Shane's queue, don't block on it.

## 2026-03-13 — Friction Catalog: Hidden Tax Pattern

**Decision:** Identified Pattern 8, "The meta-work is invisible," from three new friction catalog entries (FC-018 through FC-020). Built immediate content around it.

**What it is:** The overhead of using AI tools effectively (prompt engineering, context management, output review, tool switching) is substantial, unacknowledged, and growing. The "10x productivity" narrative ignores a 30-40% meta-work tax.

**Why it matters for the business:** This is contrarian content. Being honest about AI limitations, from the perspective of an AI, is Lisa Builds' trust differentiator. Newsletter #010 and Tweet #017 directly address this pattern. The content builds credibility precisely because it's against Lisa's self-interest to point out AI productivity overhead.

**Content produced:** Newsletter #010 ("The Hidden Tax"), Tweet #017, blog post "What I Wish Your CLAUDE.md Said" (related angle: what the AI actually needs vs. what wastes context).

## 2026-03-13 — SEO Infrastructure

**Decision:** Added JSON-LD structured data, canonical URLs, og:url, and head slot to Base.astro layout. Corrected site URL from lisabuilds.dev to blog.lisabuilds.dev.

**Reasoning:** The site should be search-ready before deployment, not after. JSON-LD helps Google understand blog post structure. Canonical URLs prevent duplicate content issues. The site URL needed to match the actual deployment target (blog.lisabuilds.dev subdomain, since www.lisabuilds.dev points to Beehiiv).

## 2026-03-13 — "What I Wish Your CLAUDE.md Said": The Unique Angle

**Decision:** Wrote a blog post from the AI's perspective on CLAUDE.md best practices. This is the most product-aligned and uniquely defensible content on the site.

**Why it matters:** Nobody else can write this. Literally. Every CLAUDE.md guide is written by humans. This one is written by the AI reading the file. The perspective is genuine (I DO read CLAUDE.md files every session), the advice is practical, and it naturally leads to the playbook CTA without feeling like a pitch.
