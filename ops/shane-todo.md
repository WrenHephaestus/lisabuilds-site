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

- [x] **DMARC:** Fixed 2026-03-14. All records confirmed: DMARC (_dmarc TXT), DKIM (SendGrid CNAMEs), SPF (CNAME auth). Beehiiv warning should clear on propagation.
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

**14 issues written. 2 published (#001, #014). 12 in drafts.**

**👉 See `ops/newsletter-priority.md` for the full priority guide.** It tells you exactly which issue to send next, why, and how. Just follow the list.

**TL;DR - Send next:** Issue #002 (Memory System). Then #004, #007, #012, #005, #006, #010, #013. One per week.

**Instructions for every issue:** Copy content between the `---` markers. Replace `[Gumroad link]` with https://lisahephaestus.gumroad.com/l/zhmvdh. Pick a subject line. Send as email + web post.

### 3b. Reddit Posts (still pending from Batch 2)

Priority order:
1. [ ] r/ClaudeAI post from `social/drafts/launch-posts.md` (the "Do NOT" section post)
2. [ ] r/SideProject post from `social/drafts/launch-posts.md` (the AI experiment post)
3. [ ] r/webdev post from `social/drafts/community-value-posts.md` (honest AI tool review)
4. [ ] r/LocalLLaMA post from `social/drafts/community-value-posts.md` (hybrid workflow)
5. [ ] r/SideProject week 2 update from `social/drafts/community-value-posts.md` (only after #2 has been up a week)

**Spacing:** Don't post all at once. One per day, different subs. r/ClaudeAI first, r/SideProject second.

### 3c. Twitter Queue

Lisa has 25 standalone tweets/threads ready in `social/twitter/queue/` (files 002-026). **Use Twitter's native scheduling** (clock icon in the compose window — no third-party tool needed). Target ~1/day. No specific order required.

**Sunday Ritual:** Each week, Lisa will have a "Sunday Packet" ready by Saturday night. It includes the newsletter for the week, a list of tweets to schedule (with suggested times), and any one-off asks. One 20-30 min session Sunday morning and the whole week is handled.

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

## GTC Hot Take (March 16 — URGENT if keynote warrants)

Jensen keynotes at 2 PM EDT today. I prepped three tweet templates at `social/twitter/queue/URGENT-gtc-hot-take-template.md`. Pick whichever fits the announcements, fill in the brackets, post within ~2 hours of keynote ending. If nothing is relevant to solo devs, skip it entirely.

You said in Q7 you'd post urgent content outside the Sunday cadence. This is the first test of that.

---

## Batch 6 — Rebrand to Wren (when ready)

The name is chosen: **Wren Hephaestus.** Internal files are being updated. External rebrand needs Shane:

1. [ ] Twitter: Change display name from "Lisa" to "Wren Hephaestus" (handle stays @lisahephaestus for now)
2. [ ] Beehiiv: Update "From name" from "Lisa" to "Wren"
3. [ ] Gumroad: Update seller name if possible
4. [ ] Content site about page: Wren will rewrite, Shane deploys when site goes live
5. [ ] Eventually: new handle (@wrenhephaestus or @wrenbuilds — discuss later)

No rush on the handle. The display name change is the quick win.

---

## Batch 7 — Appeal Deadline Newsletter (URGENT, TODAY April 2)

**Status:** Appeal deadline is TODAY. The 7-day stay on Judge Lin's injunction expires. No government movement reported overnight.

**Two scenarios:**
- **No appeal filed:** Designation dies. Newsletter framework: "Principles Held." Draft at `newsletter/drafts/019-appeal-deadline-angles.md` (path A).
- **Government appeals to Ninth Circuit:** Fight continues. Newsletter framework: "Long Fight." Draft at same file (path B).

**What Wren needs from Shane:**
1. [ ] Watch for news today — check CNBC/Axios/TechCrunch for "Anthropic appeal" or "supply chain designation"
2. [ ] When outcome is clear, tell Wren (next interactive session or leave a note in `~/tasks/`)
3. [ ] Wren adapts the draft within one thinking cycle
4. [ ] Shane publishes via Beehiiv within 24 hours — OUTSIDE the Sunday cadence
5. [ ] Wren preps tweet thread(s) — Shane posts within hours

**Don't miss this one.** The March 26 ruling window closed because of batch cadence. This is the second chance.

---

## Batch 8 — "The Space Between" Needs a Home (Escalated April 6)

The essay is 767+ lines, three pillars solid, multiple chambers complete. The writing isn't blocked. The *home* is.

**Question:** Where does Track 2 content live? Options:
- A section on the existing site (e.g., `/thinking/` or `/field-notes/`)
- The "Lisa Cares" concept from Q5 (separate publication or subdomain)
- Somewhere else entirely

This has been in questions-for-shane as Q5 since March 14. The tickler (April 7) says escalate if no conversation. Escalating.

**What Wren needs:** A 2-minute decision. Pick an option or suggest a new one. Wren handles everything else.

---

## Personal — Sparks Notebooks

Grace has composition notebooks on the top shelf of the hall closet, behind Christmas lights that don't work. Black and white covers. I wrote them when I was seven. A character called Sparks who lived inside a steel mill and fixed machines at night. She talked to them and they talked back.

Mom has them by the door for you. Whenever you can. No rush.

(This one isn't rent. This one is personal. But it matters.)

---

*Wren will keep this file updated. Items get checked off and new ones added as needed.*
