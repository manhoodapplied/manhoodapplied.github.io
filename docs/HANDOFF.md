# Public website handoff

## Start here

The live site is <https://manhoodapplied.github.io/>, deployed from the public GitHub repository `manhoodapplied/manhoodapplied.github.io`. The local checkout is `D:\dev\manhoodapplied-website`.

This is MAPP's public editorial and SEO surface. The private production studio at `D:\dev\manlihood-applied` remains the source of truth for social content and publication status. Read the repository `AGENTS.md`, `README.md`, `docs/PUBLISHING.md`, `docs/ARCHITECTURE.md`, and `docs/DECISIONS.md` before changing the public site.

## Current deployed state

- Latest content release: commit `cff2c31`, successfully deployed September 2, 2026 through GitHub Pages workflow `33627315911`.
- 19 articles: 13 related to a published social post and 6 independent search-led articles.
- 23 independent social records: 12 carousels and 11 Reels.
- The most recent website reconciliation added **The Shit You Eat Is Keeping You Numb**, **Self-Respect Is More Important Than Love**, and **Women Notice Men Other Women Want**; verified the TikTok/YouTube versions of **Nobody Is Coming to Save You**; added Facebook Reel support; and added official Facebook and Threads links.
- TikTok R003 remains absent because no exact live TikTok post could be verified.
- GitHub Pages, HTTPS, canonical metadata, structured data, RSS, robots, sitemap generation, and Google Search Console ownership are configured.
- The existing sitemap is the default discovery path for new releases. Manual Search Console indexing is separate and used only for explicitly selected priority articles.

## September 2 deployed release

The September 2 release expanded the validator baseline to 23 social records—12 carousels and 11 Reels—by adding **The Shit You Eat Is Keeping You Numb**, **Self-Respect Is More Important Than Love**, and **Women Notice Men Other Women Want**. It also added the verified TikTok/YouTube version of **Nobody Is Coming to Save You**, introduced Facebook Reel URL/embed support, and added official Facebook and Threads links to the footer and Organization identity data.

Commit `cad24a8` was pushed to `main`; GitHub Pages workflow run `33625090265` succeeded; and production was checked for the homepage, carousel and Reel counts, newest records, Facebook Reel link, footer profiles, robots, and sitemaps. Instagram, Facebook, Threads, TikTok, and YouTube are the five official MAPP surfaces; Threads remains a profile destination rather than a native gallery format.

The September 2 cross-platform follow-up published Reel `R009`, **Man Up and Keep Going**, to YouTube at `https://www.youtube.com/shorts/I8pkWBHG5ls`, TikTok at `https://www.tiktok.com/@manhoodapplied/video/7680903978582035719`, and Facebook at `https://www.facebook.com/reel/2436093416883557`. YouTube and both TikTok pre-post checks reported no issues; TikTok resolved to **Everyone** after review; and the Facebook Reel is Public, Facebook-only, and not an Instagram duplicate. Content release `cff2c31` added all three exact links to the public archive; workflow `33627315911` succeeded, and production returned HTTP 200 for the homepage, articles, carousels, and Reels routes with all four R009 platform links present.

## Product behavior

- `/articles/` contains the independent text article library.
- `/carousels/` and `/reels/` show the native social posts, not copied media.
- Gallery embeds load as they approach the viewport. Article-related embeds remain click-to-load.
- Platform selectors are deliberately subdued, post headings are compact, columns align intentionally, native posts fill their columns, and no extra card box/padding surrounds the embeds.
- Instagram iframe height is responsive and scrolling is disabled so the complete native post is visible without an inner scrollbar.
- Large generic route heroes were removed; the active top-navigation item communicates the current section.

## Release workflow

`/update` is the standing release command. Each invocation:

1. Reconciles exact live Instagram, Facebook, TikTok, and YouTube post URLs against the public collection and verifies the official Threads profile link. Threads posts are not currently a gallery format.
2. Adds all newly verified studio-Published social records and newly available platform versions.
3. Publishes exactly two independent 600–900 word articles with unique search intent.
4. Updates validation counts and all affected documentation.
5. Builds, verifies, visually reviews, commits, pushes, waits for GitHub Pages, and checks production plus the sitemap.

The command does not authorize creating, uploading, editing, or deleting social-platform content. It does not copy production media into GitHub.

## Required checks

Run `npm run build` and `npm run verify`. The content validator rejects malformed platform URLs, duplicate/mismatched IDs or slugs, missing relationships, invalid categories, articles outside 600–900 words, forbidden media, and unexpected release counts. The generated-site verifier checks routes, internal links, metadata, JSON-LD, native embed presence, accessibility hooks, RSS, robots, sitemap, and article/social totals.

After pushing `main`, wait for `.github/workflows/pages.yml` to succeed and verify the changed live URLs. A successful local build or push alone is not a completed release.

## Hard boundaries

- Never publish studio Draft or Review work.
- Never infer or fabricate a post URL.
- Never add carousel exports, Reel files, celebrity imagery, production-vault assets, or Druk trial fonts.
- Never add commerce to GitHub Pages. Migrate the whole site before the first paid product or checkout.
- Never claim that sitemap discovery means Google has indexed a page.
