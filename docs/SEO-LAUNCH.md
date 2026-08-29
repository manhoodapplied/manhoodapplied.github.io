# SEO and launch checklist

## Owner actions required before publication

- [x] Create the free GitHub organization `manhoodapplied`.
- [x] Grant the existing `pablobarriga` GitHub account owner access.
- [x] Create the public repository `manhoodapplied/manhoodapplied.github.io`.
- [x] Push this local repository's `main` branch.
- [x] In **Settings → Pages**, confirm the source is GitHub Actions.
- [x] Confirm the Pages workflow succeeds and `https://manhoodapplied.github.io/` opens.

## Technical smoke test

- [x] Homepage, all 17 articles, format archives, five topic archives, About, and 404 load.
- [x] Emblem, favicon, bundled fonts, `rss.xml`, `robots.txt`, and `sitemap-index.xml` return successfully.
- [x] Keyboard navigation and visible focus styles pass automated accessibility checks.
- [x] Layout remains readable on phone, tablet, and desktop widths.
- [x] Reduced-motion preference removes smooth scrolling and transitions.
- [x] Embed controls retain the exact outbound link and load no third-party script before interaction.
- [x] No Draft or Review item appears publicly.

Launch verification: GitHub Pages status `built`, HTTPS enforced, all public launch routes returned HTTP 200, and Lighthouse scored 100 for Performance, Accessibility, Best Practices, and SEO.

## Google Search Console

- [x] Add the URL-prefix property `https://manhoodapplied.github.io/`.
- [x] Add Google's permanent HTML meta verification token to the shared page head.
- [x] Verify ownership after the verification tag is live in production.
- [x] Submit `https://manhoodapplied.github.io/sitemap-index.xml` and the concrete `sitemap-0.xml` fallback.
- [x] Request indexing for the homepage and the four newest standalone articles.

The sitemap is the whole-site discovery mechanism. Manual URL inspection requests prioritize selected pages but do not guarantee or accelerate inclusion; Google controls crawl and indexing timing.

Search Console launch status on August 29, 2026: ownership verified by HTML tag; the homepage and all four standalone articles were accepted into Google's priority crawl queue. Both sitemap submissions were accepted by the UI, but their immediate first read showed `Couldn't fetch` even though the public files returned HTTP 200 with `application/xml`. Treat that as pending Google processing and recheck the Sitemaps report before changing the generated XML.

## Social profiles

When account access permits, add `https://manhoodapplied.github.io/` to Instagram, TikTok, and YouTube. Do not replace exact post links inside articles with profile links.

## Ongoing release check

Run `npm run build` and `npm run verify` locally. After pushing, inspect the single Pages workflow and sample the changed routes. The sitemap updates automatically.
