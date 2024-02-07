import { Metadata } from 'next';

import { BlogPageContent } from '~/components/pages/blog/blogPageContent';
import { generateRssFeed } from '~/utils/feed';
import { getAllTags, getAllPosts } from '~/utils/posts';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000'),
  robots: 'all',
};

/**
 * Blog page
 */
const BlogPage = () => {
  generateRssFeed();

  const { allPosts } = getAllPosts();
  const { allTags } = getAllTags();

  return <BlogPageContent allPosts={allPosts} allTags={allTags} />;
};

export default BlogPage;
