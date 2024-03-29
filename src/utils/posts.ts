/**
 * @file utils related to posts processing (server side)
 */
import fs from 'fs';
import path from 'path';

import rehypeSectionize from '@hbsnow/rehype-sectionize';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';
import remarkGfm from 'remark-gfm';

import { Post, Tag } from '~/types/Posts';

const postsDirectory = path.join(process.cwd(), 'src/posts');

/**
 * postsDirectory 以下のディレクトリ名を取得する
 */
export const getPostSlugs = () => {
  const allPosts = fs.readdirSync(postsDirectory);
  return allPosts.map((post: string) => post.replace(/\.mdx$/, ''));
};

/**
 * 指定したフィールド名から、記事のフィールドの値を取得する
 */
export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const post: Post = {};

  // NOTE: to exclude directories
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        post[field] = realSlug;
      }
      if (field === 'content') {
        post[field] = content;
      }
      if (data[field]) {
        post[field] = data[field];
      }
    });
  } catch (e) {
    return {};
  }

  return post;
};

/**
 * get all posts data with specified fields
 * @param fields fields to get
 */
export const getPostsByFields = (fields: string[] = []) => {
  const slugs = getPostSlugs();
  return (
    slugs
      .map((slug: string) => getPostBySlug(slug, fields))
      // NOTE: to exclude directories
      .filter((post) => !!post?.slug)
      // NOTE: sort posts by date in descending order
      .sort((post1: Post, post2: Post) => (post1.date > post2.date ? -1 : 1))
  );
};

export const getAllPosts = () => {
  const allPosts = getPostsByFields([
    'slug',
    'title',
    'date',
    'tags',
    'language',
  ]);
  return {
    allPosts: JSON.parse(JSON.stringify(allPosts)) as Post[],
  };
};

/**
 * get previous and next post of current post
 * @param slug
 * @returns
 */
export const getAdjacentPosts = (slug: string) => {
  const posts = getPostsByFields(['slug', 'title', 'date']);
  const currentPostIndex = posts.findIndex((post) => post.slug === slug);

  const prevPost = posts[currentPostIndex + 1];
  const nextPost = posts[currentPostIndex - 1];

  return {
    prevPost,
    nextPost,
  };
};

/**
 * Convert tag string to param-like string
 * @param tag
 * @returns string can be used as a param
 */
export const convertTagToParam = (tag: string) =>
  tag.toLowerCase().replace(/[.\s]/, '-');

/**
 * Get all tags
 * @returns Tag[]
 */
export const getAllTags = () => {
  const posts = getPostsByFields(['slug', 'tags']);
  const tags = posts.map((post) => post.tags).flat();

  const uniqueTags = [...new Set(tags)];
  return {
    allTags: uniqueTags.map(
      (tag) =>
        ({
          tag,
          param: convertTagToParam(tag),
        }) as Tag,
    ),
  };
};

/**
 * Get posts that of some particular tag
 * @param tag
 * @returns Post[]
 */
export const getPostsByTag = (tag: string) => {
  const posts = getPostsByFields(['slug', 'title', 'tags', 'date', 'language']);
  return posts.filter((post) => post.tags.includes(tag));
};

/**
 * Configuration for mdx-remote serialization
 */
export const mdxSerializeConfig = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeSectionize, { enableRootSection: true }],
      [
        rehypeToc,
        {
          headings: ['h2', 'h3'],
          cssClasses: { toc: 'toc-wrapper' },
        },
      ],
      rehypeHighlight,
    ] as any,
    remarkPlugins: [remarkGfm] as any,
  },
};
