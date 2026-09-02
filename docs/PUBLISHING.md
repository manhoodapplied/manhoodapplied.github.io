# Publishing and article creation

## `/update` release workflow

The private studio command `/update` is the standing public-site release contract. Each invocation performs one complete website update:

1. Compare the live Instagram, Facebook, TikTok, and YouTube profiles with `src/content/social-posts/`, and verify the official Threads profile link. Threads posts are not currently a gallery format.
2. Add every newly verified **Published** studio item and attach any newly available exact platform URLs to existing records. Omit platform versions that do not exist.
3. Publish exactly two new 600–900 word standalone articles with distinct search intent, no `sourcePostId`, unique metadata, two or three related articles, and authoritative sources when a consequential claim requires them.
4. Update enforced counts and repository documentation.
5. Run the complete build and verification suite, visually review the affected article and gallery pages at desktop and phone widths, push `main`, wait for GitHub Pages, and verify the live routes and sitemap.

The command never uploads, edits, or deletes a social-media post on any platform. It copies no social media, carousel, Reel, celebrity, or studio production assets into this repository. The existing Search Console property discovers normal releases through the sitemap; manual priority-indexing requests are a separate action unless the user explicitly includes them in that run.

## Add an article

1. Confirm the source item is **Published** in the private MAPP studio. Draft and Review items are ineligible.
2. Create `src/content/articles/<slug>.md` using a lowercase, hyphenated slug.
3. Write a unique search-focused title, a 70–170 character description, and 600–900 words of original practical text.
4. Choose one of the five category slugs.
5. Optionally set `sourcePostId` when a separately published social-post record explores the same idea.
6. Select two or three relevant published articles by slug. Avoid matching two pages that cover the same search intent from nearly identical angles.
7. Cite authoritative sources where a health, psychology, or financial claim needs support.
8. Run `npm run build` and `npm run verify` before committing.

Typography is a hard build gate: every small eyebrow or setup label uses Inter Semibold (`600`) with restrained tracking. League Gothic and other condensed display faces are reserved for large primary headlines; small gray display text is prohibited across all routes.

Minimal frontmatter:

```yaml
---
slug: example-article
title: "A Unique and Useful Search-Focused Title"
description: "A specific description that explains the practical value of the article to a search visitor."
publishedAt: 2026-08-28
sourcePostId: optional-related-social-post-id
category: mind-judgment
featured: false
draft: false
relatedSlugs: [first-related-article, second-related-article]
sources: []
---
```

## Add a social post

1. Confirm the social post is **Published** in the private studio.
2. Create `src/content/social-posts/<id>.json`. The lowercase, hyphenated `id` must match the filename.
3. Add its independent display title, description, publication date, format, category, and status.
4. Add only exact post URLs for platform versions that exist. At least one platform is required; missing versions are omitted.
5. Do not add an article reference to the social record. If an article relates to it, the optional relationship is stored on the article.

Minimal record:

```json
{
  "id": "example-social-post",
  "title": "Independent Social Post Title",
  "description": "A concise description of what the carousel or Reel gives the viewer.",
  "publishedAt": "2026-08-29",
  "contentType": "carousel",
  "category": "mind-judgment",
  "featured": false,
  "draft": false,
  "socialLinks": {
    "instagram": "https://www.instagram.com/manhoodapplied/p/EXACT_POST_ID/"
  }
}
```

## SEO publishing checklist

- One primary question or search intent per article.
- Title and description are unique across the site.
- H2 sections answer the question directly and practically.
- Internal links are represented by related articles.
- Article search intent is independent from the title or caption of a related social post.
- Exact platform URLs live only in the social-post record.
- Claims are proportionate and supported where needed.
- No private media, celebrity imagery, carousel export, Reel file, or trial font is added.

## Deployment

The GitHub repository must be public and named `manhoodapplied/manhoodapplied.github.io`. In repository **Settings → Pages**, choose **GitHub Actions** as the source. Every push to `main` runs `.github/workflows/pages.yml`; manual runs are also available.

The deployment cannot happen until the organization and repository exist. Do not publish this project under a differently named personal Pages URL as a temporary substitute, because that changes canonical URLs and creates avoidable SEO migration work.

## Sep 2, 2026 social reconciliation

- Add three studio-confirmed Published records: **The Shit You Eat Is Keeping You Numb**, **Self-Respect Is More Important Than Love**, and **Women Notice Men Other Women Want**.
- Add the verified TikTok and YouTube URLs for **Nobody Is Coming to Save You** and the verified Facebook Reel URL for **Self-Respect Is More Important Than Love**.
- Add the official Facebook and Threads profiles to the site-wide identity links. Threads remains outside the post galleries.
- The release count gate is 19 articles and 23 social records: twelve carousels and eleven Reels.
- Preserve the visual system in rendered form: Inter Semibold for small gray eyebrows, League Gothic only for large display type, signal-red structural punctuation, equal page insets, and a wrapping footer that cannot breach the right margin.
