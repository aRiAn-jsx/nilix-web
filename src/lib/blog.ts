import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Post = CollectionEntry<'blog'>;

/** "fa/what-is-capillary-distribution" → "what-is-capillary-distribution" */
export const slugOf = (p: Post) => p.id.replace(/^(fa|en)\//, '');
export const postPath = (p: Post) => (p.data.lang === 'fa' ? `/blog/${slugOf(p)}` : `/en/blog/${slugOf(p)}`);

export async function posts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('blog', (p) => p.data.lang === lang && !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** The same article in the other language, if it exists. */
export async function counterpart(p: Post): Promise<Post | undefined> {
  const other = p.data.lang === 'fa' ? 'en' : 'fa';
  const all = await getCollection('blog', (q) => q.data.lang === other && q.data.key === p.data.key && !q.data.draft);
  return all[0];
}

export function readingMinutes(body = ''): number {
  const words = body.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}
