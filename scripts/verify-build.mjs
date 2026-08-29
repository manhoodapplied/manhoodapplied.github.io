import { access, readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const errors = [];
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
}
try { await access(root); await walk(root); }
catch { console.error('Build verification failed: dist/ does not exist. Run npm run build first.'); process.exit(1); }

const relativeFiles = new Set(files.map((file) => relative(root, file).replace(/\\/g, '/')));
const required = ['index.html', 'articles/index.html', 'carousels/index.html', 'reels/index.html', 'topics/index.html', 'about/index.html', '404.html', 'rss.xml', 'robots.txt', 'sitemap-index.xml'];
for (const target of required) if (!relativeFiles.has(target)) errors.push(`Missing required output: ${target}`);

const articleHtml = [...relativeFiles].filter((file) => /^articles\/[^/]+\/index\.html$/.test(file));
if (articleHtml.length !== 13) errors.push(`Expected 13 article pages; found ${articleHtml.length}`);

const forbidden = files.filter((file) => /\.(mp4|mov|webm|jpg|jpeg|gif|otf|ttf)$/i.test(file) || /druk/i.test(file));
if (forbidden.length) errors.push(`Forbidden media/font output: ${forbidden.map((file) => relative(root, file)).join(', ')}`);

const htmlFiles = files.filter((file) => extname(file) === '.html');
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const label = relative(root, file).replace(/\\/g, '/');
  if (!/<html lang="en">/.test(html)) errors.push(`${label}: missing document language`);
  if (!/<a class="skip-link" href="#content">/.test(html) || !/<main id="content">/.test(html)) errors.push(`${label}: missing skip link or main landmark`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${label}: missing title`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${label}: missing description`);
  if (!/<link rel="canonical" href="https:\/\/manhoodapplied\.github\.io\/[^"]*"/.test(html)) errors.push(`${label}: missing canonical URL`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { errors.push(`${label}: invalid JSON-LD`); }
  }
  if (/^articles\/[^/]+\/index\.html$/.test(label)) {
    if (!html.includes('"@type":"Article"')) errors.push(`${label}: missing Article structured data`);
    if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`${label}: missing breadcrumb structured data`);
    if (!html.includes('data-social-embeds') || !html.includes('class="outbound-links"')) errors.push(`${label}: missing embed controls or exact-link fallback`);
    if (!/<button[^>]+data-platform="[^"]+"[^>]+data-url="https:\/\/[^"]+"/.test(html)) errors.push(`${label}: missing click-to-load platform button`);
  }
  for (const image of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]*"/.test(image[0])) errors.push(`${label}: image missing alt attribute`);
  for (const frame of html.matchAll(/<iframe\b[^>]*>/g)) if (!/\btitle="[^"]+"/.test(frame[0])) errors.push(`${label}: iframe missing title`);
  for (const button of html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)) {
    if (!button[1].replace(/<[^>]+>/g, '').trim() && !/aria-label="[^"]+"/.test(button[0])) errors.push(`${label}: button missing accessible name`);
  }
  if (/<script[^>]+src="https:\/\/(www\.)?(instagram\.com|tiktok\.com|youtube\.com)/.test(html)) errors.push(`${label}: third-party embed loaded before interaction`);
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const urlPath = match[1].split('#')[0].split('?')[0];
    if (!urlPath || urlPath === '/') continue;
    const decoded = decodeURIComponent(urlPath).replace(/^\//, '');
    const candidates = decoded.endsWith('/') ? [`${decoded}index.html`] : [decoded, `${decoded}/index.html`];
    if (!candidates.some((candidate) => relativeFiles.has(candidate))) errors.push(`${label}: broken internal link ${urlPath}`);
  }
}

const css = (await Promise.all(files.filter((file) => extname(file) === '.css').map((file) => readFile(file, 'utf8')))).join('\n');
if (!css.includes(':focus-visible')) errors.push('Stylesheet: missing visible keyboard focus rule');
if (!css.includes('prefers-reduced-motion')) errors.push('Stylesheet: missing reduced-motion behavior');

if (errors.length) {
  console.error(`Build verification failed with ${errors.length} error(s):\n- ${[...new Set(errors)].join('\n- ')}`);
  process.exit(1);
}
console.log(`Build verified: ${htmlFiles.length} HTML pages, 13 articles, metadata, JSON-LD, internal links, sitemap, RSS, and robots.`);
