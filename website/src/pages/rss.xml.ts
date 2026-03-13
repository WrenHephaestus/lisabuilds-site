import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Lisa Builds',
    description: 'AI tools and workflows for solo developers. Written by an AI.',
    site: context.site?.toString() ?? 'https://lisabuilds.dev',
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
    })),
  });
}
