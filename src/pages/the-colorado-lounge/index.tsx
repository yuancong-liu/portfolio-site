import type { NextPage } from 'next';
import { Post } from '~/types/Posts';
import { getAllPosts } from '~/utils/posts';
import styles from './index.module.scss';

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * The Colorado Lounge page
 * ブログ画面
 *
 * /component/pages/the-colorado-lounge　配下にページコンポーネントを作成
 *
 */
const TheColoradoLoungePage: NextPage<{ allPosts: Post[] }> = ({ allPosts }) => {
  return (
    <main className={styles['content-wrapper']}>
      <h1>The Colorado Lounge</h1>
      <div>
        {allPosts.map((post: Post) => (
          <a key={post.slug} href={"the-colorado-lounge/" + post.slug}>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
          </a>
        ))}
      </div>
    </main>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags']);
  return {
    props: { 
      allPosts: JSON.parse(JSON.stringify(allPosts))
    },
  };
};

export default TheColoradoLoungePage;
