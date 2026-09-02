# MAPP public website instructions

This repository owns the live public editorial website at `https://manhoodapplied.github.io/`. It is intentionally separate from the private MAPP content studio at `D:\dev\manlihood-applied`.

## Required startup

Read these files before making changes:

1. `README.md` — repository purpose, current baseline, and commands.
2. `docs/HANDOFF.md` — current deployed state, known limitations, and next release behavior.
3. `docs/PUBLISHING.md` — content records, `/update`, SEO checks, and deployment workflow.
4. `docs/ARCHITECTURE.md` — system boundary, routes, embeds, and commerce constraint.
5. `docs/DECISIONS.md` — product and technical decisions that must not be silently reversed.
6. `docs/SEO-LAUNCH.md` for indexing or Search Console work.

Also read `D:\dev\manlihood-applied\docs\HANDOFF.md` when the task depends on current social publication state. Check both repositories' working trees before cross-repository work and preserve unrelated changes.

## Non-negotiable boundary

- The private studio is the source of truth for Published, Review, and Draft state.
- Never publish a Draft or Review item.
- Never copy carousel exports, Reel videos, celebrity imagery, studio production assets, or Druk trial files into this public repository.
- Store only public-ready text, the existing emblem/favicon, free licensed fonts, and exact live post URLs.
- Never invent a social URL or substitute a profile URL for a missing post. The current official surfaces are Instagram, Facebook, Threads, TikTok, and YouTube. Threads is presently a profile/footer destination rather than a native gallery format; do not add Threads posts to the galleries without a documented product decision.
- Articles and social posts are independent collections. `sourcePostId` is optional and belongs only on an article.
- Native embeds must retain exact outbound fallbacks and should not create nested scrollbars or unnecessary visual containers.
- GitHub Pages is editorial hosting only. Migrate the complete site before adding checkout, paid products, customer accounts, or transaction-focused shop routes.

## Current deployed baseline

Release `433f636` deployed successfully on August 31, 2026:

- 19 published articles: 13 post-related and 6 standalone.
- 20 independent social records: 11 carousels and 9 Reels.
- TikTok has no verified R003 post, so that platform link is intentionally absent.
- Google Search Console ownership and sitemap submission are configured. Normal releases rely on the existing sitemap; manual URL Inspection requests are reserved for explicitly selected priority pages.

The September 2 working tree may contain a pending, not-yet-deployed expansion to 23 social records (12 carousels and 11 Reels), Facebook Reel embeds, and footer links for Facebook and Threads. Always inspect `git status`, the latest commit, and `docs/HANDOFF.md`; do not describe pending work as live or overwrite it.

Treat these numbers as a release baseline, not a permanent product limit. Every content change must update `scripts/validate-content.mjs`, `scripts/verify-build.mjs`, README/documentation counts, and `docs/HANDOFF.md` together.

## Content and implementation map

- Articles: `src/content/articles/*.md`
- Social records: `src/content/social-posts/*.json`
- Collection schemas: `src/content.config.ts`
- Routes: `src/pages/`
- Layout/components: `src/layouts/` and `src/components/`
- Global design: `src/styles/global.css`
- Content validation: `scripts/validate-content.mjs`
- Built-output verification: `scripts/verify-build.mjs`
- Pages deployment: `.github/workflows/pages.yml`

Valid category slugs are `mind-judgment`, `body-health`, `work-money`, `relationships`, and `character-discipline`.

## Verification and deployment

Before committing:

1. Run `npm run build`.
2. Run `npm run verify`.
3. Review affected routes at desktop and phone widths, including overflow, keyboard focus, reduced motion, embed sizing/fallbacks, metadata, and navigation state.
4. Confirm no prohibited media or trial fonts entered the repository.
5. Update architecture, publishing, handoff, SEO, and decision documentation as applicable.

Pushes to `main` deploy through GitHub Actions. A release is incomplete until the Pages workflow succeeds and changed live routes, `robots.txt`, `sitemap-index.xml`, and `sitemap-0.xml` return correctly.

## `/update`

Follow the complete contract in `docs/PUBLISHING.md`: reconcile every supported live publication surface using exact URLs, add every newly verified Published social record/version, create exactly two original 600–900 word standalone articles, update count gates and documentation, build, review, push, wait for Pages, and verify production. `/update` changes the website only; it never posts to or edits a social platform.
