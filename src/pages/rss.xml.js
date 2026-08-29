import rss from '@astrojs/rss';
import { SITE } from '../data/site';
import { getPublishedArticles, articlePath } from '../utils/content';

export async function GET(context) {
  const articles = await getPublishedArticles();
  return rss({
    title: `${SITE.name} Articles`,
    description: SITE.description,
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: articlePath(article),
      categories: [article.data.category, article.data.contentType],
    })),
    customData: '<language>en-us</language>',
  });
}
