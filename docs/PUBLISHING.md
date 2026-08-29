# Publishing and article creation

## Add an article

1. Confirm the source item is **Published** in the private MAPP studio. Draft and Review items are ineligible.
2. Create `src/content/articles/<slug>.md` using a lowercase, hyphenated slug.
3. Write a unique search-focused title, a 70–170 character description, and 600–900 words of original practical text.
4. Choose one of the five category slugs and set `contentType` to `carousel` or `reel`.
5. Add only exact URLs for versions that actually exist. Omit a platform field when its post is unavailable.
6. Select two or three relevant published articles by slug. Avoid matching two pages that cover the same search intent from nearly identical angles.
7. Cite authoritative sources where a health, psychology, or financial claim needs support.
8. Run `npm run build` and `npm run verify` before committing.

Minimal frontmatter:

```yaml
---
slug: example-article
title: "A Unique and Useful Search-Focused Title"
description: "A specific description that explains the practical value of the article to a search visitor."
publishedAt: 2026-08-28
sourcePostId: studio-source-id
contentType: carousel
category: mind-judgment
featured: false
draft: false
socialLinks:
  instagram: "https://www.instagram.com/manhoodapplied/p/EXACT_POST_ID/"
relatedSlugs: [first-related-article, second-related-article]
sources: []
---
```

## SEO publishing checklist

- One primary question or search intent per article.
- Title and description are unique across the site.
- H2 sections answer the question directly and practically.
- Internal links are represented by related articles.
- Exact social URLs point to the same source idea.
- Claims are proportionate and supported where needed.
- No private media, celebrity imagery, carousel export, Reel file, or trial font is added.

## Deployment

The GitHub repository must be public and named `manhoodapplied/manhoodapplied.github.io`. In repository **Settings → Pages**, choose **GitHub Actions** as the source. Every push to `main` runs `.github/workflows/pages.yml`; manual runs are also available.

The deployment cannot happen until the organization and repository exist. Do not publish this project under a differently named personal Pages URL as a temporary substitute, because that changes canonical URLs and creates avoidable SEO migration work.
