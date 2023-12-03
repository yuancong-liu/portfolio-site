/**
 * @file 記事取得関連のUtils
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeAttrs from 'rehype-attr';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeToc from 'rehype-toc';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import sanitizeHtml from 'sanitize-html';
import { unified } from 'unified';
import { Post, Tag } from '~/types/Posts';

const postsDirectory = path.join(process.cwd(), 'src/posts');

/**
 * postsDirectory 以下のディレクトリ名を取得する
 */
export const getPostSlugs = () => {
  const allPosts = fs.readdirSync(postsDirectory);
  return allPosts.map((post: string) => post.replace(/\.md$/, ''));
};

/**
 * 指定したフィールド名から、記事のフィールドの値を取得する
 */
export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const post: Post = {};

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

  return post;
};

/**
 * get all posts data with specified fields
 * @param fields fields to get
 */
export const getAllPosts = (fields: string[] = []) => {
  const slugs = getPostSlugs();
  return (
    slugs
      .map((slug: string) => getPostBySlug(slug, fields))
      // sort posts by date in descending order
      .sort((post1: Post, post2: Post) => (post1.date > post2.date ? -1 : 1))
  );
};

/**
 * get previous and next post of current post
 * @param slug
 * @returns
 */
export const getAdjacentPosts = (slug: string) => {
  const posts = getAllPosts(['slug', 'title', 'date']);
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
export const getAllTags = (): Tag[] => {
  const posts = getAllPosts(['tags']);
  const tags = posts.map((post) => post.tags).flat();

  const uniqueTags = [...new Set(tags)];
  return uniqueTags.map((tag) => ({
    tag,
    param: convertTagToParam(tag),
  }));
};

/**
 * Get posts that of some particular tag
 * @param tag
 * @returns Post[]
 */
export const getPostsByTag = (tag: string) => {
  const posts = getAllPosts(['slug', 'title', 'tags', 'date', 'language']);
  return posts.filter((post) => post.tags.includes(tag));
};

/**
 * Markdown を解析して HTML にして返す
 * @param markdown Markdown ファイル名
 * @returns HTML
 */
export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeToc, {
      headings: ['h2', 'h3'],
      cssClasses: { toc: 'toc-wrapper' },
    })
    .use(rehypeRaw)
    .use(rehypeAttrs, { properties: 'attr' })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .use(remarkGfm)
    .process(markdown);

  return result.toString();
};

/**
 * Configuration for sanitize-html
 */
export const sanitizeConfig = {
  allowedAttributes: {
    '*': ['class', 'src', 'id', 'data-language'],
    iframe: ['title', 'allow'],
    a: ['href', 'target'],
  },
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe']),
};
