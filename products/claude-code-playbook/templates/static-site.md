# [EDIT: Site Name]

[EDIT: What this site actually is — "my blog about distributed systems," "portfolio for freelance illustration clients," "documentation for an open source library." Be specific. The more Claude knows about the *audience*, the better it handles content structure and tone.]

## Why It's Static

This site is static because the content changes when *I* change it, not when a user clicks something. No database. No server runtime. HTML files on a CDN, served fast everywhere. If you're reaching for client-side state management or API routes, stop and ask whether this is still a static site — or whether it's become something else wearing a static site's clothes.

## Stack

- **Generator:** [EDIT: Astro / Hugo / 11ty / Next.js (static export) / plain HTML]
- **Content format:** [EDIT: Markdown / MDX / reStructuredText / HTML]
- **Styling:** [EDIT: Tailwind / vanilla CSS / Sass / UnoCSS]
- **Hosting:** [EDIT: Cloudflare Pages / Vercel / Netlify / GitHub Pages]
- **Domain:** [EDIT: registrar and DNS provider — matters for deploy hooks]
- **CMS (if any):** [EDIT: none / Keystatic / Decap / Sanity / Contentful]

## Framework-Specific Guidance

[EDIT: Delete all sections below except the one you're using.]

### If Astro

Content collections are the backbone. Define them in `src/content/config.ts` with Zod schemas — this is your frontmatter contract, and it catches broken metadata at build time instead of production.

```ts
// src/content/config.ts
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().max(160),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),       // relative path in same dir
    coverAlt: z.string().optional(),
  }),
});
```

Use `getCollection()` and `getEntry()` — never glob for content files manually. Astro already knows about your content; let it do the work.

Islands architecture means: components are static HTML by default. Only add `client:load` or `client:visible` when there's actual interactivity (search, theme toggle, embedded widget). Every island is a separate JS bundle the user downloads. Treat each one like it costs money. (It costs time, which is worse.)

Astro's `<Image />` component handles optimization — use it instead of raw `<img>` tags. It generates `srcset`, converts to WebP/AVIF, and injects width/height automatically. For content collection images, use `image()` in your schema to get build-time validation of image paths.

### If Hugo

Hugo's speed is the point. Builds in milliseconds, not seconds. Don't fight it by pulling in npm toolchains unless you genuinely need them.

Shortcodes are Hugo's killer feature for content authors. Build them for anything you repeat in posts: callout boxes, figure captions with attribution, embedded demos, code blocks with filenames. Put them in `layouts/shortcodes/` and use them in Markdown like `{{< callout type="warning" >}}`.

The template lookup order is complicated and it *will* confuse you. Hugo resolves templates through a cascade: `layouts/[type]/[layout].html` → `layouts/_default/[layout].html`. When a template isn't rendering, it's almost always a lookup order problem. Run `hugo --templateMetrics` to see what's being used.

Taxonomies (`tags`, `categories`, `series`) are first-class. Define them in `hugo.toml` and Hugo generates list pages automatically. Don't build your own tag system.

For data: `data/` directory files (YAML, JSON, TOML) are accessible in templates via `.Site.Data`. Use this for things like navigation menus, social links, team members — structured data that isn't a page.

### If 11ty (Eleventy)

The data cascade is 11ty's superpower and its biggest source of confusion. Data flows from global (`_data/`) → directory-level (`posts/posts.json`) → template-level (frontmatter) → computed. When something has the wrong value, trace the cascade.

Directory data files are underused and incredibly handy. A `posts/posts.json` with `{"layout": "post.njk", "tags": "posts"}` means every Markdown file in that directory inherits those values. No more repeating layout declarations in every frontmatter block.

11ty doesn't have a preferred template language — Nunjucks, Liquid, JavaScript templates, WebC, they all work. Pick one and commit. [EDIT: We use Nunjucks / Liquid / WebC / JS templates]. Mixing template languages in one project leads to debugging sessions where you're wrong about which syntax does what.

The `addPassthroughCopy` method in `.eleventy.js` is how static assets get into the output. It's easy to forget this, deploy, and wonder why images are 404ing.

For computed data and complex content transforms, use `eleventyComputed` in frontmatter or `_data/eleventyComputed.js`. Reading time, auto-generated excerpts, related posts — all computed data problems.

### If Next.js (Static Export)

You're using `output: 'export'` in `next.config.js`. This means: no API routes, no middleware, no ISR, no server components that fetch at request time. You get `getStaticProps` and `getStaticPaths`, and that's it. If you need anything dynamic, you're in the wrong template.

`generateStaticParams` (App Router) or `getStaticPaths` (Pages Router) must enumerate every page. If you're fetching from a CMS, every slug needs to be listed at build time. Miss one and it's a 404 in production.

Next.js image optimization (`next/image`) does NOT work with static export by default. You need a custom loader (Cloudinary, imgix) or set `images.unoptimized: true` and handle optimization yourself — at build time with sharp, or via your CDN's image transform.

Be honest about whether Next.js is the right choice here. It carries a lot of framework weight for a static site. If you're not leveraging React components heavily, Astro or Hugo will give you faster builds and smaller output.

## Project Structure

```
[EDIT: site-name]/
├── src/
│   ├── pages/              # Route-generating files (or content/ in Hugo)
│   ├── layouts/            # Page shells — base, post, landing, etc.
│   ├── components/         # Reusable pieces. Not everything needs to be a component.
│   └── content/            # The actual content (Markdown/MDX)
│       ├── blog/
│       └── [EDIT: other collections — docs, projects, recipes, whatever this site has]
├── public/                 # Static assets that go to the root — favicon, robots.txt, fonts
│   ├── fonts/              # Self-hosted font files (woff2)
│   └── images/             # [EDIT: flat or organized by content — pick one and stick with it]
├── styles/                 # Global CSS (reset, variables, typography, utilities)
└── [EDIT: astro.config.mjs / hugo.toml / .eleventy.js / next.config.js]
```

## Content Pipeline

### Frontmatter Schema

Every content file has frontmatter. Here's the contract — don't deviate without updating the schema.

```yaml
---
title: "Descriptive, specific title"     # Required. Used in <title>, OG, and H1.
date: 2025-01-15                         # Required. ISO format. Used for sorting.
description: "Under 160 characters."     # Required. Used in meta description and OG.
tags: [tag-one, tag-two]                 # Optional. Lowercase, hyphenated.
draft: true                              # Optional. Defaults to false.
[EDIT: additional fields your site uses — cover image, author, series, canonical URL, etc.]
---
```

Validate frontmatter at build time. Astro does this natively with Zod. For Hugo, use `hugo --printUnusedTemplates` and front matter linting. For 11ty, write a `beforeBuild` check or use a plugin. A typo in frontmatter shouldn't make it to production.

### MDX (if using it)

MDX lets you put components in Markdown. Use it for things Markdown can't express: interactive demos, comparison tables with toggles, charts. Don't use it to wrap paragraphs in `<Callout>` components when a blockquote or a custom class would do. Every MDX component is a coupling point between your content and your code.

Import components at the top of the file, not globally. If you change a global component mapping and break 40 posts, that's on you.

### Images

Content images go in [EDIT: `src/content/blog/[slug]/` next to the post / `public/images/[slug]/` — pick one convention].

Every image needs:
- **Explicit width and height** (or aspect ratio via CSS). Not for styling — for preventing layout shift. The browser reserves space before the image loads.
- **Alt text.** Describe what the image *communicates*, not what it literally shows. "Performance comparison showing 40% improvement" is better than "A bar chart."
- **Optimized format.** Your build pipeline or CDN should serve WebP/AVIF with a fallback. Don't commit a 2MB PNG and call it done.
- **Lazy loading** on anything below the fold. `loading="lazy"` on the `<img>` tag. But NOT on the hero/LCP image — that one should load eagerly.

## Performance (The Real Kind)

"Get a good Lighthouse score" is not a performance strategy. It's a starting point. Here's what actually matters.

### Largest Contentful Paint (LCP)

This is the metric. The one users feel. Usually it's a hero image or the first big block of text.

- **Preload the LCP resource.** If it's an image: `<link rel="preload" as="image" href="...">` in the `<head>`. If it's a font used in your headline: preload the font file.
- **Don't lazy-load the LCP image.** Sounds obvious, but build tools sometimes add `loading="lazy"` to everything.
- **Inline critical CSS.** The CSS needed to render above-the-fold content should be in a `<style>` tag in the `<head>`, not behind a render-blocking stylesheet request. Most frameworks have plugins for this.
- **Use `fetchpriority="high"`** on the LCP image element. Tells the browser to prioritize it over other images discovered at the same time.

### Cumulative Layout Shift (CLS)

Layout shift is content jumping around as the page loads. Users hate it. It happens because of:

- Images without dimensions (the browser doesn't know how much space to reserve)
- Fonts loading and swapping (FOUT) — mitigate with `font-display: optional` (not `swap` — `optional` prevents the flash entirely by giving up and using the fallback if the font is slow)
- Dynamic content injected above existing content (ads, banners, cookie notices)
- Embeds (YouTube, tweets) without reserved space — wrap them in a container with `aspect-ratio`

### The Rest

- **Fonts:** Self-host. Subset to the character ranges you actually use (`pyftsubset` or `glyphhanger`). Two files max: regular and bold. If you're loading 6 weights, rethink the design.
- **CSS:** On a static site, you probably have under 20KB of CSS. Ship it as one file. The overhead of splitting and loading multiple sheets is worse than one slightly-larger file at this scale.
- **JavaScript:** Every byte of JS on a static site should justify its existence. A theme toggle is ~20 lines. A search index is worth it. A parallax library is not.
- **Caching:** Set `Cache-Control: public, max-age=31536000, immutable` on hashed/fingerprinted assets (JS, CSS, images with content hashes in filenames). Set shorter TTLs on HTML files so content updates propagate. Your CDN handles this if configured right.
- **Preconnect** to origins you'll need: `<link rel="preconnect" href="https://fonts.gstatic.com">` (if you *must* use Google Fonts), analytics domains, etc. Two or three max — each preconnect has a cost.

## Build & Deploy

### Local Development

```bash
[EDIT: your actual commands]
dev:     npm run dev             # Local server with hot reload
build:   npm run build           # Full production build
preview: npm run preview         # Serve production build locally — always check this before deploying
```

Always run `preview` before you push. Dev mode hides problems: it skips optimizations, doesn't tree-shake, and serves unminified everything. The production build is a different animal.

### Deploy Pipeline

[EDIT: Delete all except the one you're using.]

**Cloudflare Pages:**
- Push to `main` → auto-builds and deploys
- Build command: [EDIT: `npm run build` / `hugo` / `npx @11ty/eleventy`]
- Output directory: [EDIT: `dist/` / `public/` / `_site/` / `out/`]
- Preview deployments on every PR — use them for visual review
- Custom domain: configure in Cloudflare dashboard, it handles SSL
- `_headers` and `_redirects` files in the output directory for custom headers and redirects

**Vercel:**
- Push to `main` → auto-builds and deploys
- Framework preset auto-detects most config
- `vercel.json` for headers, redirects, rewrites
- Edge functions available if you need them later (but if you do, revisit whether static is right)

**Netlify:**
- Push to `main` → auto-builds and deploys
- `netlify.toml` in project root for build config and redirects
- Netlify Forms if you need a contact form without a backend (add `netlify` attribute to `<form>`)
- `_redirects` file in output for simple redirects

**GitHub Pages:**
- GitHub Actions workflow builds and deploys to `gh-pages` branch
- Set the correct `base` path if deploying to `username.github.io/repo-name/` (not a custom domain)
- No server-side redirects — use `<meta http-equiv="refresh">` or JS redirects (ugly, but it's the tradeoff)

### Redirects

You will need redirects eventually. When you change a URL structure, when you merge two posts, when you fix a typo in a slug from 2019. Set them up now.

Each platform has its own format. Cloudflare and Netlify use `_redirects` files. Vercel uses `vercel.json`. Hugo generates aliases from frontmatter. Know your platform's mechanism and use it.

Test redirects after deploy. A 301 that points to a 404 is worse than no redirect at all.

## SEO

- Every page gets a unique `<title>` and `<meta name="description">`. Generate them from frontmatter — don't hand-write HTML meta tags.
- Canonical URLs on every page. Especially if content appears at multiple paths.
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`) and Twitter Card tags. Make a layout partial that generates these from frontmatter so you never think about it again.
- `og:image` matters more than you think. When someone shares your post, the image is what they see first. Generate them with a build-time tool ([EDIT: `@vercel/og` / `satori` / Cloudinary transforms]) or design a reusable template.
- Structured data (JSON-LD) for blog posts — `Article` type with `headline`, `datePublished`, `author`. Embed it in a `<script type="application/ld+json">` tag in the layout.
- `sitemap.xml` — generated at build time. [EDIT: your framework likely has a plugin or built-in support]. Submit it to Google Search Console.
- `robots.txt` in the public root. Don't overthink it. `Allow: /` and a `Sitemap:` directive pointing to your sitemap.

## RSS

Your site should have an RSS feed. It's 2025 and people still use RSS readers. (Good people.)

Put it at `/feed.xml` or `/rss.xml`. Generate it at build time from your content collection. Include `title`, `link`, `description`, `pubDate`, and the full content body — don't make people click through to read.

## Accessibility

Not a checklist item. It's the difference between your site working for everyone and your site working for some people.

- **Semantic HTML.** `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`. Screen readers use these landmarks to navigate. A page of nested `<div>`s is a maze with no signs.
- **Heading hierarchy.** One `<h1>` per page. Don't skip from `<h2>` to `<h4>` because you like how `<h4>` looks — use CSS for styling, headings for structure.
- **Skip-to-content link.** First focusable element on the page. Visually hidden until focused. Keyboard users and screen readers use this constantly.
- **Focus states.** Never set `outline: none` without providing an alternative. If you can't see where focus is, keyboard users can't use your site.
- **Color contrast.** WCAG AA minimum (4.5:1 for body text, 3:1 for large text). Check with your browser's dev tools — they all have contrast checkers built in now.
- **Alt text on images.** Describe what the image *communicates*. If it's decorative, use `alt=""` — an empty alt, not a missing alt. Missing alt means the screen reader reads the filename, which is never helpful.
- **Reduced motion.** Wrap animations in `@media (prefers-reduced-motion: no-preference)`. Some people get physically sick from animations. It's one line of CSS.

## Important Context

[EDIT: This section is your site's memory. Update it as things change.]
- Content update frequency: [EDIT: daily / weekly / whenever I feel like it]
- Analytics: [EDIT: Plausible / Fathom / GoatCounter / none — avoid Google Analytics on a static site, the privacy cost isn't worth it]
- Contact form: [EDIT: Netlify Forms / Formspree / mailto link / none]
- Newsletter integration: [EDIT: Beehiiv / Buttondown / ConvertKit embed / none]
- [EDIT: anything else Claude should know — content tone, brand guidelines, things you always forget]

## Do NOT

- Don't add client-side rendering to a static site. No React hydration, no Vue app mount, no Svelte entry point wrapping the whole page. If you need that, use a different template.
- Don't install a CSS framework and then override half of it. If Tailwind doesn't fit your design, use vanilla CSS. If Bootstrap doesn't fit, *definitely* use vanilla CSS.
- Don't use Google Fonts via the `<link>` tag. It's an extra DNS lookup, an extra connection, and a render-blocking request. Download the files, subset them, self-host.
- Don't commit images without optimizing them. Run them through `sharp`, `squoosh`, or `imagemin` before they enter the repo. A 4MB hero image in `public/` is a git history problem forever.
- Don't use `target="_blank"` on internal links. (And on external links, always pair it with `rel="noopener"`.)
- Don't build a custom Markdown rendering pipeline when your framework already has one. Hugo's goldmark, Astro's built-in Markdown, 11ty's markdown-it — they work. Customize them, don't replace them.
- Don't store content in a database or CMS unless the site has multiple non-technical editors. For a solo dev, Markdown in git is the CMS. It's versioned, portable, and you can edit it in any text editor on any machine.
- Don't ship a service worker unless you understand the cache invalidation implications. A broken service worker serves stale content indefinitely and your users won't know to clear their cache.
- [EDIT: project-specific guardrails — the mistakes *you* keep making]
