import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { posts, postPath } from '../../lib/blog';

export async function GET(context: APIContext) {
  const list = await posts('en');
  return rss({
    title: 'nilix blog',
    description: 'Guides to wholesale buying and distribution',
    site: context.site!,
    items: list.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: postPath(p), categories: [p.data.category, ...p.data.tags] })),
    customData: '<language>en</language>',
  });
}
