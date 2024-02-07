/**
 * @file Feed 関連のUtils
 */
import fs from 'fs';

import { Feed } from 'feed';
// import rehypeRaw from 'rehype-raw';
// import rehypeSlug from 'rehype-slug';
// import rehypeStringify from 'rehype-stringify';
// import remarkGfm from 'remark-gfm';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';
// import { unified } from 'unified';

import { getPostsByFields } from './posts';

export const generateRssFeed = async () => {
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

  const postPromise = posts.map(async (post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.content,
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

// export const markdownToHtml = async (markdown: string) => {
//   const result = await unified()
//     .use(remarkParse)
//     .use(remarkRehype, { allowDangerousHtml: true })
//     // .use(rehypeSlug)
//     .use(rehypeRaw)
//     // .use(rehypeStringify)
//     .process(markdown);

//   return result.toString();
// };
