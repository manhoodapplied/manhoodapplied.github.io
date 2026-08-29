# SEO and launch checklist

## Owner actions required before publication

- [ ] Create the free GitHub organization `manhoodapplied`.
- [ ] Grant the existing `pablobarriga` GitHub account owner access.
- [ ] Create the public repository `manhoodapplied/manhoodapplied.github.io`.
- [ ] Push this local repository's `main` branch.
- [ ] In **Settings → Pages**, confirm the source is GitHub Actions.
- [ ] Confirm the Pages workflow succeeds and `https://manhoodapplied.github.io/` opens.

## Technical smoke test

- [ ] Homepage, all 13 articles, format archives, five topic archives, About, and 404 load.
- [ ] Emblem, favicon, bundled fonts, `rss.xml`, `robots.txt`, and `sitemap-index.xml` return successfully.
- [ ] Keyboard navigation and visible focus styles work.
- [ ] Layout remains readable on phone, tablet, and desktop widths.
- [ ] Reduced-motion preference removes smooth scrolling and transitions.
- [ ] Every available social button loads the matching post; blocked embeds retain the exact outbound link.
- [ ] No Draft or Review item appears publicly.

## Google Search Console

1. Open Google Search Console while signed into the MAPP owner account.
2. Add the URL-prefix property `https://manhoodapplied.github.io/`.
3. Complete the available ownership verification method. GitHub Pages cannot add DNS records, so use a supported URL-prefix method.
4. Submit `https://manhoodapplied.github.io/sitemap-index.xml` once.
5. Request indexing for the homepage and the launch-priority articles after the live pages have been checked.

Search Console access changes external account state and therefore remains an owner action.

## Social profiles

When account access permits, add `https://manhoodapplied.github.io/` to Instagram, TikTok, and YouTube. Do not replace exact post links inside articles with profile links.

## Ongoing release check

Run `npm run build` and `npm run verify` locally. After pushing, inspect the single Pages workflow and sample the changed routes. The sitemap updates automatically.
