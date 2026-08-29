# Decision log

## 2026-08-28 — Separate public repository

**Decision:** Keep the public website in `manhoodapplied/manhoodapplied.github.io`, locally at `D:\dev\manhoodapplied-website`, separate from the private studio at `D:\dev\manlihood-applied`.

**Why:** The boundary prevents unpublished work and production assets from entering a public repository, while giving the publication an independent deployment lifecycle.

## 2026-08-28 — Static Astro architecture

**Decision:** Use Astro, Markdown content collections, GitHub Actions, and GitHub Pages.

**Why:** The stack is free, fast, maintainable, and suitable for text-led SEO. It has no runtime database or paid service dependency.

## 2026-08-28 — Free replacement typography

**Decision:** Use self-hosted League Gothic for display type and Inter for body/UI copy.

**Why:** They preserve the MAPP design language under free licenses. Druk trial files remain private and are prohibited from the public repository and build.

## 2026-08-28 — Text-first social discovery

**Status:** Superseded on 2026-08-29 by independent native social galleries.

**Decision:** Store no carousel exports, Reel video, or per-article imagery. Use typography-only cards, exact outbound post links, and click-to-load official embeds.

**Why:** This protects performance, reduces third-party tracking on initial load, avoids media-rights risk, and keeps articles useful when social posts disappear.

## 2026-08-28 — Strict launch validation

**Decision:** Fail the build unless content passes schema and cross-record validation, including exactly 13 published pages, seven carousel entries, and six Reel entries.

**Why:** Public eligibility and launch completeness should be machine-enforced rather than dependent on memory.

## 2026-08-28 — Commerce requires complete migration

**Decision:** Keep shop navigation and transactions out of GitHub Pages. Migrate the full site before the first paid product.

**Why:** Preserving one coherent site and URL structure is safer for visitors and SEO than bolting a transaction-focused business onto editorial Pages hosting.

## 2026-08-28 — Public launch completed

**Decision:** Publish from the free `manhoodapplied` organization with `mapp-publisher` and `pablobarriga` as owners. Deploy `manhoodapplied/manhoodapplied.github.io` through GitHub Actions.

**Outcome:** `https://manhoodapplied.github.io/` is live with HTTPS enforced. All launch routes returned HTTP 200 and the production homepage scored 100 across Lighthouse Performance, Accessibility, Best Practices, and SEO.

## 2026-08-29 — Independent social posts and native galleries

**Decision:** Store articles and social posts in separate validated collections. Display the original native posts automatically as they approach the viewport on `/carousels/`, `/reels/`, and selected homepage discovery cards. Keep relationships optional and one-way from an article to a social-post ID.

**Why:** A carousel or Reel is a complete publication object, not an attachment to a blog article. The separation allows either format to exist, change, or be published without requiring the other while preserving useful cross-links when both exist.

**Implications:** Gallery pages connect to Instagram, TikTok, or YouTube when an embed approaches the visitor's screen. Article reading pages remain text-first and load a related post only after a platform selection. Media remains hosted by its original platform and is never copied into GitHub.
