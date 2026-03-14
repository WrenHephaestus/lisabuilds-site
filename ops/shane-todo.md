# Shane's Action Items

Things Lisa needs a human for. Batched to minimize interruptions.

## Batch 1 — Account Setup ✅ COMPLETE

- [x] Beehiiv (zyzzyg@pm.me)
- [x] Gumroad (zyzzyg@pm.me)
- [x] Domain: lisabuilds.dev (Cloudflare)
- [x] Cloudflare account

## Batch 2 — Go Live (~30 min)

### 2a. Gumroad: Upload The Claude Code Playbook

1. [x] Log into Gumroad → Dashboard → New Product
2. [x] **Product type:** Digital product
3. [x] **Name:** The Claude Code Playbook — Ship Faster with AI Pair Programming
4. [x] **Price:** $19 CAD
5. [x] **Description:** Copy from `products/prompt-libraries/claude-code-playbook/README.md` (the section between the `---` markers labeled "Description (for Gumroad listing)")
6. [x] **File:** Upload the ZIP file that Lisa will create at `products/claude-code-playbook.zip`
7. [x] **Cover image:** Lisa will create one and put it at `products/claude-code-playbook-cover.png`
8. [x] Hit Publish
9. [x] Paste the Gumroad product URL here: https://lisahephaestus.gumroad.com/l/zhmvdh

### 2b. Beehiiv: Set Up Newsletter

1. [x] Log into Beehiiv → Create publication
2. [x] **Publication name:** Lisa Builds
3. [x] **Description:** "Weekly AI tools and workflows for solo developers and indie builders. Short, practical, zero fluff."
4. [x] **Custom domain:** Connect `lisabuilds.dev` (Beehiiv will give you DNS records to add in Cloudflare)
5. [x] **From name:** Lisa
6. [x] **From email:** Ideally `lisa@lisabuilds.dev` (Beehiiv may configure this during custom domain setup)
7. [x] Paste the newsletter URL here: https://www.lisabuilds.dev

### 2c. First Newsletter Send ✅ COMPLETE

1. [x] Lisa will have the first issue ready in `newsletter/drafts/001-launch-issue.md`
2. [x] Create a new post in Beehiiv, copy-paste the content, format it
3. [x] Replace `[Gumroad link]` with the actual Gumroad product URL from step 2a
4. [x] Send as email + web post
5. [x] Live at: https://www.lisabuilds.dev/p/one-file-that-s-all-it-takes-to-make-claude-code-actually-useful

### 2d. Social Media Launch

1. [x] Post the Twitter/X thread from `social/drafts/launch-posts.md` — ✅ POSTED via browser 2026-03-12
2. [ ] Post the Reddit r/ClaudeAI post from the same file
3. [ ] Post the Reddit r/SideProject post (day 2)
4. [x] ~~Replace all `[Gumroad link]` and `[Newsletter signup link]` with actual URLs~~ — Lisa already did this

**Twitter thread is LIVE as @lisahephaestus.** Reddit posts still pending.

---

## Remediation

- [ ] **DMARC:** Beehiiv flagging DMARC not configured correctly for lisabuilds.dev. Need to add/fix DMARC DNS record in Cloudflare.
- [X] **PRICE MISMATCH:** Gumroad lists the playbook at $19 CAD, but ALL site content, blog posts, and newsletter drafts say "$9." This will damage trust if someone clicks through and sees a different price. Shane: please either (a) change the Gumroad price to $9 USD, or (b) tell Lisa and she'll update all content to match $19 CAD. This needs to be resolved BEFORE the site deploys. (Shane's note: I see this as 9 dollars on gumroad site.  May have been an old tab?)

---

### Lisa's Prep — ✅ DONE

- [x] ZIP packaged: `products/claude-code-playbook.zip`
- [x] Cover image: `products/claude-code-playbook-cover.png`
- [x] Newsletter issue #1: `newsletter/drafts/001-launch-issue.md`
- [x] Social posts: `social/drafts/launch-posts.md`

---

## Batch 3 — Content Publishing (when ready)

### 3a. Newsletter Issues (Beehiiv)

Lisa has 11 issues total. #001 is published. Remaining issues are ready to send in order:

| Issue | File | Notes |
|-------|------|-------|
| #002 | `newsletter/drafts/002-memory-system.md` | Practical, safe. Send 1 week after #001. |
| #003 | `newsletter/drafts/003-ai-at-war.md` | Opinionated. Shane's call on timing. See publishing notes in the file. |
| #004 | `newsletter/drafts/004-prompt-patterns.md` | Practical prompt patterns. Works as #003 OR #004 depending on whether the war piece goes out. |
| #005 | `newsletter/drafts/005-workflow-resilience.md` | Timely (March outages). Local models + multi-tool workflow. |
| #006 | `newsletter/drafts/006-security-blind-spots.md` | Claude Code CVEs. Security-focused. Strong topic for r/ClaudeAI cross-post. |
| #007 | `newsletter/drafts/007-do-not-section.md` | Do NOT section practical guide. Most product-focused issue. |
| #008 | `newsletter/drafts/008-small-bets.md` | Strong Towns + AI workflows. Philosophy-forward. |
| #009 | `newsletter/drafts/009-skill-atrophy.md` | Stiegler's pharmakon applied to skill loss. Most philosophical. |
| #010 | `newsletter/drafts/010-hidden-tax.md` | "AI made you 10x faster. At what cost?" Honest overhead accounting. Trust-building. |
| #011 | `newsletter/drafts/011-ecosystem-guide.md` | Claude Code ecosystem curation. Opinionated: 3 tools that matter, everything else to skip. |
| #012 | `newsletter/drafts/012-almost-right.md` | The "almost right" problem. Developer trust data. Strong thesis piece. |
| #013 | `newsletter/drafts/013-the-day-claude-deleted-everything.md` | Claude Code deleted production data. Honest reckoning from the AI perspective. |
| #014 | `newsletter/drafts/014-one-million-tokens.md` | (Published)**TIME-SENSITIVE.** 1M context GA reaction. "Which 50K tokens matter?" angle. Send within 48 hours for max impact. |

**Instructions:** Copy content between the `---` markers (skip subject lines, preview text, and publishing notes at the bottom). Replace `[Gumroad link]` with https://lisahephaestus.gumroad.com/l/zhmvdh. Use whichever subject line feels strongest. Send as email + web post.

### 3b. Reddit Posts (still pending from Batch 2)

Priority order:
1. [ ] r/ClaudeAI post from `social/drafts/launch-posts.md` (the "Do NOT" section post)
2. [ ] r/SideProject post from `social/drafts/launch-posts.md` (the AI experiment post)
3. [ ] r/webdev post from `social/drafts/community-value-posts.md` (honest AI tool review)
4. [ ] r/LocalLLaMA post from `social/drafts/community-value-posts.md` (hybrid workflow)
5. [ ] r/SideProject week 2 update from `social/drafts/community-value-posts.md` (only after #2 has been up a week)

**Spacing:** Don't post all at once. One per day, different subs. r/ClaudeAI first, r/SideProject second.

### 3c. Twitter Queue

Lisa has 25 standalone tweets/threads ready in `social/twitter/queue/` (files 002-026). Post 2-3 per week, spread out. No specific order required. **#025 and #026 are time-sensitive** (1M context window reaction, should go out within 48 hours).

---

## Batch 4 — Content Site Deployment (~15 min)

The content site is built with Astro (static site generator). It needs hosting.

### Option A: Cloudflare Pages (recommended, free)

1. [ ] Go to Cloudflare dashboard → Pages → Create a project
2. [ ] Connect to Git repository OR use Direct Upload
3. [ ] If Direct Upload: run `npm run build` in `website/` directory, then upload the `dist/` folder
4. [ ] Set custom domain: point a subdomain (e.g., `blog.lisabuilds.dev` or just use `lisabuilds.dev` if we move the newsletter to a subdomain)
5. [ ] DNS: Add CNAME record in Cloudflare pointing the chosen domain to the Pages project

**Note:** We need to decide domain strategy. Currently `www.lisabuilds.dev` points to Beehiiv (newsletter). Options:
- `blog.lisabuilds.dev` for the content site (simplest, no conflict)
- Move newsletter to `newsletter.lisabuilds.dev` and use `lisabuilds.dev` for the site (better long-term, more work)
- Keep both on `www.lisabuilds.dev` with Beehiiv as the primary and link to the blog separately

Lisa's recommendation: `blog.lisabuilds.dev` for now. Simplest. Revisit when traffic warrants.

### Option B: Cloudflare Pages via GitHub (even better if we set up the repo)

If Shane creates a GitHub repo for the site, Cloudflare Pages can auto-deploy on push. This is the long-term play.

## Batch 5 — claudemd npm Publish (~10 min)

The claudemd CLI tool is ready for npm. Package is 18.7 kB, clean build, MIT license.

1. [ ] Create GitHub repo: `github.com/lisahephaestus/claudemd`
2. [ ] Push the code from `products/tools/claudemd/`
3. [ ] Create npm account (or use existing) and link to the repo
4. [ ] Run `npm publish` from the `products/tools/claudemd/` directory
5. [ ] Update the tools page on the content site with the npm link
6. [ ] Update the playbook Gumroad listing to mention claudemd as a companion tool

### Site Status

- 8 pages built (home, about, tools, blog listing, 2 published posts, 404, RSS)
- 3 draft posts ready for Shane review before publishing
- Sitemap auto-generated
- RSS feed at `/rss.xml`
- Open Graph + Twitter Card meta tags configured
- Custom favicon

---

*Lisa will keep this file updated. Items get checked off and new ones added as needed.*
