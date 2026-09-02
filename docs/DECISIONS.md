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

**Small-type boundary (updated Aug 30, 2026):** Every small gray eyebrow uses Inter Semibold (`600`) with restrained tracking. League Gothic is reserved for large primary headlines. A build-time check enforces the global eyebrow role across every current and archived page.

## 2026-08-28 — Text-first social discovery

**Status:** Superseded on 2026-08-29 by independent native social galleries.

**Decision:** Store no carousel exports, Reel video, or per-article imagery. Use typography-only cards, exact outbound post links, and click-to-load official embeds.

**Why:** This protects performance, reduces third-party tracking on initial load, avoids media-rights risk, and keeps articles useful when social posts disappear.

## 2026-08-28 — Strict launch validation

**Decision:** Fail the build unless content passes schema and cross-record validation, including the documented publication counts for articles, carousels, and Reels.

**Why:** Public eligibility and launch completeness should be machine-enforced rather than dependent on memory.

**Count evolution:** The launch baseline was 13 articles, seven carousels, and six Reels. The August 29 baseline was 17 articles, seven carousels, and seven Reels. The current baseline is 19 articles, eleven carousels, and nine Reels.

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

**Validation:** The August 29 public baseline became 17 articles: 13 post-related pages with exact-link embed fallbacks and four standalone pages. Build verification enforces both counts separately so removing an embed from a post-related article or accidentally attaching one to this launch batch fails review.

## 2026-08-29 — Use permanent Search Console meta verification

**Decision:** Place the Google Search Console verification token in the shared HTML head, retain the canonical URL-prefix property, and submit the generated sitemap index after deployment.

**Why:** A shared meta tag survives normal content releases and verifies every generated page without adding a repository-only HTML file. The sitemap provides whole-site discovery; URL Inspection requests are reserved for the homepage and highest-priority new articles.

**Launch outcome:** Ownership verification succeeded. Search Console accepted both sitemap submissions and priority indexing requests for the homepage plus all four standalone articles. The sitemap rows initially reported `Couldn't fetch` despite verified HTTP 200 XML responses; retain the generated files and recheck Google's processing state before treating that transient first read as an implementation defect.

## 2026-08-31 — Reconcile the complete 20-post social archive

**Decision:** Add the six verified Instagram publications missing after the 14-post website baseline: carousels `009`–`012` and Reels `R008`–`R009`. Add the verified TikTok and YouTube versions of `R004`–`R007` to their existing records.

**Why:** The public galleries should reflect actual platform state, not the date of the last website release. One social record remains the source of truth for every exact platform URL, while absent versions remain omitted. No post media enters GitHub.

**Superseded baseline:** 20 independent social records—eleven carousels and nine Reels—and 19 articles. Thirteen articles relate to a post; six are standalone.

## 2026-08-31 — Define `/update` as a repeatable release command

**Decision:** Every `/update` invocation reconciles the three live social profiles, publishes missing verified records and platform links, creates exactly two independent search-led articles, updates documentation and count gates, verifies the site, and deploys the reviewed release to GitHub Pages.

**Boundary:** `/update` changes the public website only. It does not upload, edit, or delete social content, and it does not copy production media into GitHub. Sitemap discovery is automatic; manual Search Console requests remain separate unless explicitly requested.

## 2026-09-02 — Reconcile the 23-post archive and five official surfaces

**Decision:** Complete the pending public-site release by adding the three studio-verified publications missing from the website: carousel **The Shit You Eat Is Keeping You Numb**, Reel **Self-Respect Is More Important Than Love**, and Reel **Women Notice Men Other Women Want**. Attach the verified TikTok and YouTube versions of **Nobody Is Coming to Save You** and the verified Facebook version of **Self-Respect Is More Important Than Love**.

**Platform model:** Add Facebook as a validated optional post platform with the same lazy native-player and exact-link fallback behavior as the existing platforms. Add the official Facebook and Threads profiles to the site-wide identity links and Organization structured data. Threads remains a profile destination rather than a gallery format.

**Visual application:** Keep every small gray eyebrow in Inter Semibold, every large display role in League Gothic, and every structural terminal mark in signal red. Preserve equal responsive page insets and make the expanded five-link footer wrap inside its container instead of risking a right-edge breach. These are rendered design rules, not visitor-facing rule text.

**Release baseline:** 19 articles and 23 independent social records: twelve carousels and eleven Reels. Thirteen articles remain post-related and six remain standalone.

**Deployment outcome:** Release commit `cad24a8` passed the complete build and verification suite, deployed through successful GitHub Pages workflow `33625090265`, and was verified on production on September 2, 2026. The 23-post baseline, Facebook Reel player, and Facebook/Threads identity links are live.

## 2026-09-02 — Make website context discoverable from every project entry point

**Decision:** Add repository-level `AGENTS.md` files, a dedicated public-site handoff, and a workspace-root project map that explicitly routes work between the private studio and public website.

**Why:** The architecture and release history were documented, but a new Codex session starting from the shared workspace could not discover either repository or its documentation. Documentation that exists but is absent from the startup path is not an effective handoff.

**Implication:** New sessions must read the owning repository's instructions and handoff before acting. Cross-repository changes must keep both sides' summaries current rather than relying on conversation history.

## 2026-09-02 — Publish R009 across the three video surfaces

**Decision:** Preserve Instagram order by publishing Reel `R009`, **Man Up and Keep Going**, as the next cross-platform video on YouTube, TikTok, and Facebook. Use the approved V9 master and value-rich platform copy. Keep the Facebook destination Facebook-only so the existing Instagram Reel is not duplicated.

**Verified URLs:** YouTube `https://www.youtube.com/shorts/I8pkWBHG5ls`; TikTok `https://www.tiktok.com/@manhoodapplied/video/7680903978582035719`; Facebook `https://www.facebook.com/reel/2436093416883557`.

**Verification:** YouTube published from the Manhood Applied channel with no copyright issues. TikTok passed music and content checks, carries the AI-generated label, and resolved to **Everyone**. Facebook passed copyright checks and is Public on the Manhood Applied Page only.
