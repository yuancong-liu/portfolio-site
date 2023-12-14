/**
 * @file Feed 関連のUtils
 */

import fs from 'fs';
import { Feed } from 'feed';
import sanitizeHtml, { IOptions } from 'sanitize-html';
import { getAllPosts, markdownToHtml } from './posts';

export const generateRssFeed = async () => {
  const posts = getAllPosts(['slug', 'title', 'date', 'tags', 'content']);
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
      description: sanitizeHtml(
        await markdownToHtml(post.content),
        sanitizeConfig,
      ),
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

const sanitizeConfig = {
  allowedAttributes: {
    '*': ['src', 'id'],
    iframe: ['title', 'allow'],
    a: ['href', 'target'],
    img: ['src', 'alt'],
  },
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe', 'img']),
  disallowedTagsMode: 'discard',
} as IOptions;
