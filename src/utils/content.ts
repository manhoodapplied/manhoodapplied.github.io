import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

export async function getPublishedArticles() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export function articlePath(article: Article) { return `/articles/${article.data.slug}/`; }

export function estimateReadingTime(body: string) {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  return { wordCount, minutes: Math.max(1, Math.ceil(wordCount / 220)) };
}
