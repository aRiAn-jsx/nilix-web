import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { posts, postPath } from '../lib/blog';

export async function GET(context: APIContext) {
  const list = await posts('fa');
  return rss({
    title: 'مقالات نیلیکس',
    description: 'راهنمای خرید عمده و پخش مویرگی',
    site: context.site!,
    items: list.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: postPath(p), categories: [p.data.category, ...p.data.tags] })),
    customData: '<language>fa-IR</language>',
  });
}
