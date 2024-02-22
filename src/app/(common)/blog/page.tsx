import { Metadata } from 'next';

import { BlogPageContent } from '~/components/pages/blog/blogPageContent';
import { generateRssFeed } from '~/utils/feed';
import { getAllTags, getAllPosts } from '~/utils/posts';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000'),
  robots: 'all',
  title: "YC's Blog",
};

/**
 * Blog page
 */
const BlogPage = () => {
  generateRssFeed();

  const { allPosts } = getAllPosts();
  const { allTags } = getAllTags();

  const latestPostTitle = allPosts[0].title;
  metadata.description = `Welcome to YC\'s blog! Read the latest blog post: ${latestPostTitle}`;

  return <BlogPageContent allPosts={allPosts} allTags={allTags} />;
};

export default BlogPage;
