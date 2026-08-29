import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const platformUrl = (platform: 'instagram' | 'tiktok' | 'youtube') =>
  z.url().refine((value) => {
    const host = new URL(value).hostname.replace(/^www\./, '');
    const allowedHosts = {
      instagram: ['instagram.com'],
      tiktok: ['tiktok.com'],
      youtube: ['youtube.com', 'youtu.be'],
    };
    return allowedHosts[platform].includes(host);
  }, `Must be an exact ${platform} URL`);

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(10),
    description: z.string().min(70).max(170),
    publishedAt: z.coerce.date(),
    sourcePostId: z.string().regex(/^[a-z0-9-]+$/),
    contentType: z.enum(['carousel', 'reel']),
    category: z.enum(['mind-judgment', 'body-health', 'work-money', 'relationships', 'character-discipline']),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    socialLinks: z.object({
      instagram: platformUrl('instagram').optional(),
      tiktok: platformUrl('tiktok').optional(),
      youtube: platformUrl('youtube').optional(),
    }).default({}),
    relatedSlugs: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(2).max(3),
    sources: z.array(z.object({
      title: z.string().min(3),
      publication: z.string().min(2),
      url: z.url(),
    })).default([]),
  }),
});

export const collections = { articles };
