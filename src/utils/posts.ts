/**
 * @file 記事取得関連のUtils
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
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
 * すべての記事について、指定したフィールドの値を取得して返す
 * @param fields 取得するフィールド
 */
export const getAllPosts = (fields: string[] = []) => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug: string) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1: Post, post2: Post) => (post1.date > post2.date ? -1 : 1));
  return posts;
};

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
    param: tag.toLowerCase().replace(/[.\s]/, '-')
  }));
};

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
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .use(remarkGfm)
    .process(markdown);
  return result.toString();
};
