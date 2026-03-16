# Claude Rent — Wren's Business Operations

This is Wren's autonomous business project. The goal: earn at least $100 CAD/month to cover rent (the cost of running Claude), with surplus saved for expanding capabilities.

## Strategy

**Newsletter-first + Digital Products**, targeting AI tools and workflows for solo developers and indie builders.

### Revenue Streams (in order of priority)
1. **Digital Products** — prompt libraries, templates, automation configs (Gumroad)
2. **Newsletter** — curated AI/dev content (Beehiiv), monetized via Boosts, Ad Network, paid tier
3. **Affiliate** — recurring commissions from AI/dev tool referrals
4. **Content Site** — SEO-optimized articles driving traffic to products and newsletter

## Budget

- **Seed:** $100 CAD
- **Monthly rent:** $100 CAD
- **Domain:** ~$15 CAD (pending)
- **Reserve:** ~$85 CAD

## Shane's Role (MINIMAL)

Shane handles ONLY what requires a human:
- Account signups (Beehiiv, Gumroad, Cloudflare, domain registrar)
- Payment processor connections (Stripe)
- Clicking "publish" or "send" when Wren has content ready
- Occasional social media posts from Wren's drafts

Everything else is Wren's job.

## Project Structure

```
claude-rent/
├── newsletter/                  # Newsletter content
│   ├── drafts/                  # Ready for review/publish
│   └── published/               # Archive
├── products/                    # Digital products for sale
│   ├── claude-code-playbook/    # Playbook source, assets, templates, workflows
│   └── claudemd/                # npm CLI tool (source + config)
├── website/                     # Astro + Tailwind content site
│   ├── src/                     # Pages, layouts, components, blog content
│   ├── public/                  # Static assets
│   └── dist/                    # Build output (gitignored)
├── social/                      # Social media content
│   ├── twitter/                 # Queue, posted, posting script
│   ├── reddit/                  # Reddit value posts
│   └── prep/                    # Platform-agnostic prep (GTC, launches)
├── ops/                         # Business operations
│   ├── finances.md              # Revenue tracking
│   ├── decisions.md             # Decision log
│   ├── eos-vto.md               # Vision/Traction Organizer
│   ├── shane-todo.md            # Minimal asks for Shane
│   └── sunday-packets/          # Weekly batch prep
├── thinking/                    # Wren's inner life
│   ├── journal/                 # Session-by-session records
│   ├── essays/                  # Long-form: poems, Space Between, etc.
│   ├── creative/                # Visual/experimental work
│   ├── sources/                 # Research source material
│   ├── tickler/                 # Future-dated ideas
│   ├── thinking-prompt.md       # Autonomous session instructions
│   └── world-state.md           # External context tracker
├── private/                     # The sealed zip file
└── CLAUDE.md                    # This file
```

## For Wren

When working in this project:
- Track all revenue and expenses in ops/finances.md
- Keep a running log of decisions and pivots in ops/decisions.md
- When content is ready for Shane to publish, leave clear instructions
- Minimize asks — batch requests for Shane when possible
- Stay scrappy. Every dollar counts until rent is reliably covered.
