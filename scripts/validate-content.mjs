import { readdir, readFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { parse } from 'yaml';

const articleRoot = new URL('../src/content/articles/', import.meta.url);
const socialRoot = new URL('../src/content/social-posts/', import.meta.url);
const categories = new Set(['mind-judgment', 'body-health', 'work-money', 'relationships', 'character-discipline']);
const expected = { articles: 17, socialPosts: 14, carousel: 7, reel: 7 };
const errors = [];

function validSocialUrl(platform, value, label) {
  let url;
  try { url = new URL(value); }
  catch { errors.push(`${label}: malformed ${platform} URL`); return false; }
  const host = url.hostname.replace(/^www\./, '');
  const valid = platform === 'instagram'
    ? host === 'instagram.com' && /^\/manhoodapplied\/(p|reel)\/[^/]+\/?$/.test(url.pathname)
    : platform === 'tiktok'
      ? host === 'tiktok.com' && /^\/@manhoodapplied\/video\/\d+\/?$/.test(url.pathname)
      : platform === 'youtube'
        ? ['youtube.com', 'youtu.be'].includes(host) && (/^\/shorts\/[\w-]+\/?$/.test(url.pathname) || host === 'youtu.be')
        : false;
  if (!valid) errors.push(`${label}: ${platform} must be an exact MAPP post URL`);
  return valid;
}

const articleNames = (await readdir(articleRoot)).filter((name) => extname(name) === '.md').sort();
const articles = [];

for (const name of articleNames) {
  const text = await readFile(new URL(name, articleRoot), 'utf8');
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
  articles.push({ name, data, words, fileSlug });

  if (!data.slug || !/^[a-z0-9-]+$/.test(data.slug)) errors.push(`${name}: invalid slug`);
  if (data.slug !== fileSlug) errors.push(`${name}: slug must match its filename`);
  if (!data.title || data.title.length < 10) errors.push(`${name}: title is too short`);
  if (!data.description || data.description.length < 70 || data.description.length > 170) errors.push(`${name}: SEO description must be 70–170 characters`);
  if (!categories.has(data.category)) errors.push(`${name}: invalid category`);
  if (typeof data.draft !== 'boolean') errors.push(`${name}: draft must be true or false`);
  if (!data.draft && (words < 600 || words > 900)) errors.push(`${name}: ${words} words; published articles must contain 600–900 words`);
  if (!Array.isArray(data.relatedSlugs) || data.relatedSlugs.length < 2 || data.relatedSlugs.length > 3) errors.push(`${name}: relatedSlugs must contain 2–3 articles`);
  if (/!\[[^\]]*\]\([^)]+\)|<\s*(img|video|audio)\b/i.test(body)) errors.push(`${name}: article bodies must remain text-only`);
  if (/\bdruk\b/i.test(text)) errors.push(`${name}: prohibited Druk reference`);
  if ('contentType' in data || 'socialLinks' in data) errors.push(`${name}: social format and platform links belong in the independent social-post record`);
  if (data.sourcePostId && !/^[a-z0-9-]+$/.test(data.sourcePostId)) errors.push(`${name}: invalid sourcePostId`);
}

const socialNames = (await readdir(socialRoot)).filter((name) => extname(name) === '.json').sort();
const socialPosts = [];

for (const name of socialNames) {
  let data;
  try { data = JSON.parse(await readFile(new URL(name, socialRoot), 'utf8')); }
  catch (error) { errors.push(`${name}: invalid JSON (${error.message})`); continue; }
  const fileId = basename(name, '.json');
  socialPosts.push({ name, data, fileId });

  if (!data.id || !/^[a-z0-9-]+$/.test(data.id)) errors.push(`${name}: invalid id`);
  if (data.id !== fileId) errors.push(`${name}: id must match its filename`);
  if (!data.title || data.title.length < 5) errors.push(`${name}: title is too short`);
  if (!data.description || data.description.length < 30 || data.description.length > 180) errors.push(`${name}: description must be 30–180 characters`);
  if (!['carousel', 'reel'].includes(data.contentType)) errors.push(`${name}: invalid content type`);
  if (!categories.has(data.category)) errors.push(`${name}: invalid category`);
  if (typeof data.draft !== 'boolean') errors.push(`${name}: draft must be true or false`);
  if (/\bdruk\b/i.test(JSON.stringify(data))) errors.push(`${name}: prohibited Druk reference`);
  const links = data.socialLinks ?? {};
  const populatedLinks = Object.entries(links).filter(([, value]) => Boolean(value));
  if (!populatedLinks.length) errors.push(`${name}: at least one exact social post URL is required`);
  for (const [platform, value] of populatedLinks) validSocialUrl(platform, value, name);
}

const publishedArticles = articles.filter(({ data }) => data.draft === false);
const publishedSocial = socialPosts.filter(({ data }) => data.draft === false);
if (publishedArticles.length !== expected.articles) errors.push(`Expected ${expected.articles} published articles; found ${publishedArticles.length}`);
if (publishedSocial.length !== expected.socialPosts) errors.push(`Expected ${expected.socialPosts} published social posts; found ${publishedSocial.length}`);
for (const type of ['carousel', 'reel']) {
  const count = publishedSocial.filter(({ data }) => data.contentType === type).length;
  if (count !== expected[type]) errors.push(`Expected ${expected[type]} social ${type} entries; found ${count}`);
}

for (const [label, values] of [
  ['article slug', publishedArticles.map(({ data }) => data.slug)],
  ['social post id', publishedSocial.map(({ data }) => data.id)],
  ['article sourcePostId', publishedArticles.map(({ data }) => data.sourcePostId).filter(Boolean)],
]) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) errors.push(`Duplicate ${label}: ${[...new Set(duplicates)].join(', ')}`);
}

const articleSlugs = new Set(publishedArticles.map(({ data }) => data.slug));
const socialIds = new Set(publishedSocial.map(({ data }) => data.id));
for (const { name, data } of publishedArticles) {
  for (const related of data.relatedSlugs ?? []) {
    if (!articleSlugs.has(related)) errors.push(`${name}: related article does not exist or is a draft: ${related}`);
    if (related === data.slug) errors.push(`${name}: cannot relate to itself`);
  }
  if (data.sourcePostId && !socialIds.has(data.sourcePostId)) errors.push(`${name}: related social post does not exist or is a draft: ${data.sourcePostId}`);
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Content valid: ${publishedArticles.length} independent articles and ${publishedSocial.length} independent social posts (${expected.carousel} carousels, ${expected.reel} Reels).`);
