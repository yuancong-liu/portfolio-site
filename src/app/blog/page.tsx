import { PageHeader } from '~/components/pages/blog/pageHeader';
import { PostCard } from '~/components/pages/blog/postCard';
import { Post } from '~/types/Posts';
import { generateRssFeed } from '~/utils/feed';
import { getAllPosts } from '~/utils/posts';
import styles from './index.module.scss';

// const BASE_URL = 'blog/';

/**
 * Blog page
 * ブログ画面
 *
 * /component/pages/the-colorado-lounge　配下にページコンポーネントを作成
 *
 */
const BlogPage = () => {
  const { allPosts } = getPosts();

  return (
    <>
      <PageHeader>Blog</PageHeader>
      <main className={styles['content-wrapper']}>
        <div className={styles['posts']}>
          {allPosts.map((post: Post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </>
  );
};

const getPosts = () => {
  generateRssFeed();

  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags', 'language']);
  return {
    allPosts: JSON.parse(JSON.stringify(allPosts)),
  };
};

export default BlogPage;
