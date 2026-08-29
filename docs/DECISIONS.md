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

**Decision:** Fail the build unless content passes schema and cross-record validation, including the documented publication counts for articles, carousels, and Reels.

**Why:** Public eligibility and launch completeness should be machine-enforced rather than dependent on memory.

**Count evolution:** The launch baseline was 13 articles, seven carousels, and six Reels. The current verified baseline is 17 articles, seven carousels, and seven Reels.

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

## 2026-08-29 — Make the native post the gallery's visual priority

**Decision:** Use perfectly aligned two-column rows on desktop, with one shared header height for every social card in a row. Reduce heading scale, quiet the platform selector, and remove the outer grid border plus card-section dividers.

**Why:** The original large headings, red platform control and dense line grid competed with the media. Stable header geometry keeps embedded posts aligned even when titles wrap differently, while whitespace establishes separation without turning every card into a nested box.

## 2026-08-29 — Use navigation, not generic page heroes, for route orientation

**Decision:** Remove the oversized generic hero blocks from Articles, Carousels, Reels, Topics, topic listings, and About. Preserve one semantic page heading for accessibility and document structure, but let the active primary-navigation item provide the visible route cue. Keep meaningful editorial and article headlines visible.

**Why:** Repeating a route name at display scale consumed the first viewport without helping the visitor. The public libraries should lead with their articles or native posts, while a persistent active-navigation treatment communicates location more efficiently. All width-constrained page sections now share an explicit centered-container rule.

## 2026-08-29 — Render complete Instagram cards without nested scrolling

**Decision:** Size Instagram frames from the embed document's measured responsive geometry instead of using one fixed height. The frame height follows its available width with a small safety buffer, while the iframe's own scrolling is disabled. Apply the same rule to gallery and article-page embeds.

**Why:** Instagram's native card is approximately `1.25 × width + 190px` at the widths used by MAPP. The previous fixed `760px` height clipped both carousel and Reel cards and exposed an internal scrollbar. A responsive full-document frame keeps the complete post visible and leaves the website as the only scrolling surface.

**Visual refinement:** Native posts sit directly on the page canvas. The gallery and article embed stages retain their loading, sizing and fallback responsibilities but have no background panel, border or padding box around the platform's own complete card. Gallery Instagram frames fill the complete column width; no fixed frame cap may recreate empty lateral gutters.

## 2026-08-29 — Reconcile the public gallery with Instagram's 14 live posts

**Decision:** Add published Reel `R007`, **Your Life Can't Be Just This**, from its verified exact Instagram URL. Keep carousel `008`, **Cut Carbs Without Losing Performance**, as the newest carousel because Instagram confirms it is already the latest live carousel and already exists in the public collection.

**Why:** The Instagram profile contains seven carousels and seven Reels. The public site already contained all seven carousels but only six Reels, so adding `R007` restores parity without duplicating the latest carousel.

## 2026-08-29 — Publish four standalone search-led articles

**Decision:** Add four independent text-only articles about difficult conversations, asking for a raise, task procrastination, and handling criticism. They do not claim a relationship to any carousel or Reel and therefore contain no social embed controls.

**Why:** MAPP's article library should be able to answer useful search questions beyond the subjects already published on social media. Keeping the relationship optional preserves the independent article/social architecture and avoids manufacturing a false source-post association.

**Validation:** The public baseline is now 17 articles: 13 post-related pages with exact-link embed fallbacks and four standalone pages. Build verification enforces both counts separately so removing an embed from a post-related article or accidentally attaching one to this launch batch fails review.

## 2026-08-29 — Use permanent Search Console meta verification

**Decision:** Place the Google Search Console verification token in the shared HTML head, retain the canonical URL-prefix property, and submit the generated sitemap index after deployment.

**Why:** A shared meta tag survives normal content releases and verifies every generated page without adding a repository-only HTML file. The sitemap provides whole-site discovery; URL Inspection requests are reserved for the homepage and highest-priority new articles.

**Launch outcome:** Ownership verification succeeded. Search Console accepted both sitemap submissions and priority indexing requests for the homepage plus all four standalone articles. The sitemap rows initially reported `Couldn't fetch` despite verified HTTP 200 XML responses; retain the generated files and recheck Google's processing state before treating that transient first read as an implementation defect.
