import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Articles live in src/content/blog/<lang>/<slug>.md.
 * `key` pairs a Persian article with its English version (same key = translations of each other).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    lang: z.enum(['fa', 'en']),
    key: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('تیم نیلیکس'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
