# Architecture

## Purpose and boundary

This repository is MAPP's public editorial and SEO surface. `D:\dev\manlihood-applied` remains the private content studio and source of truth for production status. Content moves one way: only items marked Published in the studio are deliberately rewritten and added here. This website never reads the studio at build time, which prevents Draft and Review work from leaking into a public deployment.

The launch boundary is intentionally narrow: articles, carousel/Reel discovery, topic categories, and social links. There is no CMS, database, server function, analytics collector, visitor account, email capture, or commerce route.

## Technology

- Astro produces a fully static site.
- Markdown content collections hold articles and validated metadata.
- League Gothic and Inter are installed from Fontsource and bundled as local webfonts.
- GitHub Actions builds the site; GitHub Pages serves the generated files.
- `@astrojs/sitemap` and `@astrojs/rss` create discovery feeds.

The browser receives normal HTML for every article. JavaScript is used only for the visitor-initiated social embed loader. An article remains useful and linkable when JavaScript is unavailable.

## Content model

Every `src/content/articles/<slug>.md` record contains:

- `slug`, `title`, `description`, and `publishedAt`
- `sourcePostId`, `contentType`, `category`, `featured`, and `draft`
- optional exact `socialLinks.instagram`, `socialLinks.tiktok`, and `socialLinks.youtube`
- two or three `relatedSlugs`
- optional restrained `sources`
- a 600–900 word Markdown body

Astro validates the record shape. `scripts/validate-content.mjs` adds cross-record checks that schemas alone cannot enforce: unique slugs/source IDs, filename agreement, existing related articles, exact launch counts, body length, text-only content, and platform-specific post URL formats.

## Routes and rendering

- `/` is the editorial landing page.
- `/articles/` and `/articles/<slug>/` are the complete library and individual essays.
- `/carousels/` and `/reels/` are format-specific discovery pages.
- `/topics/` and `/topics/<slug>/` organize the five studio-aligned categories.
- `/about/`, `/404.html`, `/rss.xml`, `robots.txt`, and sitemap files support trust and discovery.

Draft entries are filtered from every collection query and every generated route. The build also requires exactly 13 published launch articles, seven carousels, and six Reels.

## Embed behavior and privacy

Article HTML contains buttons and exact outbound links, not preloaded social players. Selecting a platform creates its official embed and only then connects to that third party. YouTube uses the privacy-enhanced `youtube-nocookie.com` player. If a script is blocked or a post is removed, the exact source link remains visible. A profile link is never substituted for a missing post URL.

## Commerce migration boundary

GitHub Pages is the editorial host, not the future store. Before the first paid product, checkout, customer account, or transaction-oriented feature launches, migrate the complete site to a commerce-capable host. Preserve URLs, content records, canonical paths, and redirects during that move. The public navigation must not mention a shop until the migration and commerce system are ready.
