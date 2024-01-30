import { BlogPageContent } from '~/components/pages/blog/blogPageContent';
import { generateRssFeed } from '~/utils/feed';
import { getAllTags, getPosts } from '~/utils/posts';

/**
 * Blog page
 */
const BlogPage = () => {
  generateRssFeed();

  const { allPosts } = getPosts();
  const allTags = getAllTags();

  return <BlogPageContent allPosts={allPosts} allTags={allTags} />;
};

export default BlogPage;
