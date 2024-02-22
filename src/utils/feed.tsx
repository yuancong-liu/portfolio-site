/**
 * @file Feed 関連のUtils
 */
import fs from 'fs';

import { Feed } from 'feed';

import { getPostsByFields } from './posts';

export const generateRssFeed = async (
  contentProcessor: (content: string) => Promise<string>,
) => {
  const posts = getPostsByFields(['slug', 'title', 'date', 'tags', 'content']);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const date = new Date();
  const author = {
    name: 'YUANCONG.L',
    email: 'yuanc129.liu@yahoo.com',
    link: process.env.NEXT_PUBLIC_SITE_URL,
  };

  const feed = new Feed({
    title: "YUANCONG.L's Blog",
    id: siteUrl,
    link: `${siteUrl}/blog`,
    description: "YUANCONG.L's Blog",
    copyright: `All rights reserved ${date.getFullYear()}, YUANCONG.L`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/blog/rss.xml`,
      json: `${siteUrl}/blog/feed.json`,
      atom: `${siteUrl}/blog/atom.xml`,
    },
    author,
  });

  // const stringifyContent = async (content: string) => {
  //   return (await import('react-dom/server')).renderToStaticMarkup(<MDXRemote source={content} />);
  // };

  const postPromise = posts.map(async (post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: await contentProcessor(post.content),
      date: new Date(post.date),
    });
  });

  Promise.all(postPromise).then(() => {
    fs.mkdirSync('./public/rss', { recursive: true });
    fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
    fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
    fs.writeFileSync('./public/rss/feed.json', feed.json1());
  });
};
