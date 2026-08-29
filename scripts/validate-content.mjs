import { readdir, readFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { parse } from 'yaml';

const root = new URL('../src/content/articles/', import.meta.url);
const categories = new Set(['mind-judgment', 'body-health', 'work-money', 'relationships', 'character-discipline']);
const expected = { total: 13, carousel: 7, reel: 6 };
const errors = [];
const names = (await readdir(root)).filter((name) => extname(name) === '.md').sort();
const articles = [];

for (const name of names) {
  const text = await readFile(new URL(name, root), 'utf8');
  const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${name}: missing or malformed YAML frontmatter`);
    continue;
  }
  let data;
  try { data = parse(match[1]); }
  catch (error) { errors.push(`${name}: invalid YAML (${error.message})`); continue; }

  const body = match[2];
  const fileSlug = basename(name, '.md');
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[[^\]]+\]\([^)]+\)/g, ' ')
    .replace(/[#>*_`~\-]/g, ' ')
    .trim().split(/\s+/).filter(Boolean).length;
  articles.push({ name, data, body, words, fileSlug });

  if (!data.slug || !/^[a-z0-9-]+$/.test(data.slug)) errors.push(`${name}: invalid slug`);
  if (data.slug !== fileSlug) errors.push(`${name}: slug must match its filename`);
  if (!data.title || data.title.length < 10) errors.push(`${name}: title is too short`);
  if (!data.description || data.description.length < 70 || data.description.length > 170) errors.push(`${name}: SEO description must be 70–170 characters`);
  if (!categories.has(data.category)) errors.push(`${name}: invalid category`);
  if (!['carousel', 'reel'].includes(data.contentType)) errors.push(`${name}: invalid content type`);
  if (typeof data.draft !== 'boolean') errors.push(`${name}: draft must be true or false`);
  if (!data.draft && (words < 600 || words > 900)) errors.push(`${name}: ${words} words; published articles must contain 600–900 words`);
  if (!Array.isArray(data.relatedSlugs) || data.relatedSlugs.length < 2 || data.relatedSlugs.length > 3) errors.push(`${name}: relatedSlugs must contain 2–3 articles`);
  if (/!\[[^\]]*\]\([^)]+\)|<\s*(img|video|audio)\b/i.test(body)) errors.push(`${name}: article bodies must remain text-only`);
  if (/\bdruk\b/i.test(text)) errors.push(`${name}: prohibited Druk reference`);

  const links = data.socialLinks ?? {};
  for (const [platform, value] of Object.entries(links)) {
    if (!value) continue;
    let url;
    try { url = new URL(value); } catch { errors.push(`${name}: malformed ${platform} URL`); continue; }
    const host = url.hostname.replace(/^www\./, '');
    const valid = platform === 'instagram'
      ? host === 'instagram.com' && /^\/manhoodapplied\/(p|reel)\/[^/]+\/?$/.test(url.pathname)
      : platform === 'tiktok'
        ? host === 'tiktok.com' && /^\/@manhoodapplied\/video\/\d+\/?$/.test(url.pathname)
        : platform === 'youtube'
          ? ['youtube.com', 'youtu.be'].includes(host) && (/^\/shorts\/[\w-]+\/?$/.test(url.pathname) || host === 'youtu.be')
          : false;
    if (!valid) errors.push(`${name}: ${platform} must be an exact MAPP post URL`);
  }
}

const published = articles.filter(({ data }) => data.draft === false);
const slugs = published.map(({ data }) => data.slug);
const sourceIds = published.map(({ data }) => data.sourcePostId);
if (published.length !== expected.total) errors.push(`Expected ${expected.total} published articles; found ${published.length}`);
for (const type of ['carousel', 'reel']) {
  const count = published.filter(({ data }) => data.contentType === type).length;
  if (count !== expected[type]) errors.push(`Expected ${expected[type]} ${type} entries; found ${count}`);
}
for (const [label, values] of [['slug', slugs], ['sourcePostId', sourceIds]]) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) errors.push(`Duplicate ${label}: ${[...new Set(duplicates)].join(', ')}`);
}
const slugSet = new Set(slugs);
for (const { name, data } of published) {
  for (const related of data.relatedSlugs ?? []) {
    if (!slugSet.has(related)) errors.push(`${name}: related article does not exist or is a draft: ${related}`);
    if (related === data.slug) errors.push(`${name}: cannot relate to itself`);
  }
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Content valid: ${published.length} articles (${expected.carousel} carousels, ${expected.reel} Reels), all 600–900 words.`);
