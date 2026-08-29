# Architecture

## Purpose and boundary

This repository is MAPP's public editorial and SEO surface. `D:\dev\manlihood-applied` remains the private content studio and source of truth for production status. Content moves one way: only items marked Published in the studio are deliberately rewritten and added here. This website never reads the studio at build time, which prevents Draft and Review work from leaking into a public deployment.

The launch boundary is intentionally narrow: articles, carousel/Reel discovery, topic categories, and social links. There is no CMS, database, server function, analytics collector, visitor account, email capture, or commerce route.

## Technology

- Astro produces a fully static site.
- Markdown content records hold articles; JSON content records hold independent social posts and their platform URLs.
- League Gothic and Inter are installed from Fontsource and bundled as local webfonts.
- GitHub Actions builds the site; GitHub Pages serves the generated files.
- `@astrojs/sitemap` and `@astrojs/rss` create discovery feeds.

The browser receives normal HTML for every article and social gallery. JavaScript loads native social posts as their cards approach the viewport. Article pages still require an explicit platform selection before loading a related embed. All records and exact outbound links remain useful when JavaScript or a third-party embed is unavailable.

## Content model

Every `src/content/articles/<slug>.md` record contains:

- `slug`, `title`, `description`, and `publishedAt`
- optional `sourcePostId`, plus `category`, `featured`, and `draft`
- two or three `relatedSlugs`
- optional restrained `sources`
- a 600–900 word Markdown body

Every `src/content/social-posts/<id>.json` record independently contains its title, description, publication date, format, category, status, and exact Instagram, TikTok, and YouTube post URLs. A social record does not require an article. An article may optionally identify a related social record through `sourcePostId`.

Astro validates both record shapes. `scripts/validate-content.mjs` adds cross-record checks that schemas alone cannot enforce: unique slugs and IDs, filename agreement, valid optional relationships, exact launch counts, body length, text-only articles, and platform-specific post URL formats. Article records are rejected if they contain social format or platform-link fields.

## Routes and rendering

- `/` is the editorial landing page.
- `/articles/` and `/articles/<slug>/` are the complete library and individual essays.
- `/carousels/` and `/reels/` are native social-post galleries, independent from the article library.
- `/topics/` and `/topics/<slug>/` organize the five studio-aligned categories.
- `/about/`, `/404.html`, `/rss.xml`, `robots.txt`, and sitemap files support trust and discovery.

Draft entries are filtered from both collections and every generated route. The build currently requires exactly 17 published articles and 14 published social records: seven carousels and seven Reels.

## Embed behavior and privacy

Carousel and Reel gallery cards automatically request their default native embed only when they approach the viewport. Platform controls switch to another exact version when one exists. YouTube uses the privacy-enhanced `youtube-nocookie.com` player; TikTok and Instagram use their native player frames.

Instagram outbound links retain the exact username-prefixed MAPP URL. The loader normalizes only the embed permalink to Instagram's canonical `/p/<id>/` or `/reel/<id>/` route because the username-prefixed page route is refused inside Instagram's iframe player. Instagram frames use a measured responsive document height and disable nested scrolling so the complete native card remains visible at once.

Related embeds on article pages remain click-to-load, keeping reading pages text-first. If any embed is blocked or a post is removed, the exact source link remains visible. A profile link is never substituted for a missing post URL, and no post media is copied into GitHub.

## Commerce migration boundary

GitHub Pages is the editorial host, not the future store. Before the first paid product, checkout, customer account, or transaction-oriented feature launches, migrate the complete site to a commerce-capable host. Preserve URLs, content records, canonical paths, and redirects during that move. The public navigation must not mention a shop until the migration and commerce system are ready.
