# Manhood Applied public website

The static editorial website for **Manhood Applied (MAPP)**, intended for publication at <https://manhoodapplied.github.io/>. It expands MAPP's published carousels and Reels into practical, text-led articles for search and direct reading.

The site is deliberately separate from the private MAPP content studio. The studio remains the production source of record; this repository contains only public-ready writing, the existing emblem/favicon, and exact outbound post URLs.

## What ships

- 13 launch articles: seven based on published carousels and six based on published Reels.
- Five topic archives, plus dedicated article, carousel, and Reel indexes.
- Click-to-load Instagram, TikTok, and YouTube embeds with exact-link fallbacks.
- Canonical metadata, Open Graph data, Article/Organization/Breadcrumb structured data, RSS, sitemap, robots, and a custom 404.
- Self-hosted League Gothic and Inter packages under free licenses. No Druk trial files.
- Static deployment through GitHub Actions and GitHub Pages, with no paid services or visitor analytics.

## Local use

Requires Node.js 22.13 or newer.

```sh
npm install
npm run dev
npm run build
npm run verify
```

`npm run build` rejects invalid content before Astro creates the site. `npm run verify` audits the generated output for required routes, broken internal links, metadata, JSON-LD syntax, forbidden media, and expected launch counts.

## Publishing status

The implementation is ready locally. Publication requires the GitHub owner to create the free `manhoodapplied` organization, grant `pablobarriga` owner access, create the public `manhoodapplied.github.io` repository, and push this repository's `main` branch. The included workflow then deploys on every push.

See [Publishing](docs/PUBLISHING.md), [Architecture](docs/ARCHITECTURE.md), [SEO launch](docs/SEO-LAUNCH.md), and the [Decision log](docs/DECISIONS.md).
