import { BlogPageContent } from '~/components/pages/blog/blogPageContent';
import { generateRssFeed } from '~/utils/feed';
import { getPosts } from '~/utils/posts';

/**
 * Blog page
 */
const BlogPage = () => {
  generateRssFeed();
  const { allPosts } = getPosts();

  return <BlogPageContent allPosts={allPosts} />;
};

export default BlogPage;
