import classNames from 'classnames';
import type { NextPage } from 'next';
import Link from 'next/link';
import { LayoutBlog } from '~/components/layouts/the-colorado-lounge';
import { Post } from '~/types/Posts';
import { getDateString } from '~/utils/dates';
import { generateRssFeed } from '~/utils/feed';
import { getLocale } from '~/utils/locales';
import { getAllPosts } from '~/utils/posts';
import styles from './index.module.scss';

/**
 * The Colorado Lounge page
 * ブログ画面
 *
 * /component/pages/the-colorado-lounge　配下にページコンポーネントを作成
 *
 */
const TheColoradoLoungePage: NextPage<{ allPosts: Post[] }> = ({
  allPosts,
}) => {
  const shouldShowNewTag = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays <= 30;
  };

  return (
    <LayoutBlog>
      <main className={styles['content-wrapper']}>
        <h1 className={styles['title']}>The Colorado Lounge</h1>
        <div className={styles['posts']}>
          {allPosts.map((post: Post) => (
            <div
              className={classNames(styles['post-card'], {
                [styles['-new']]: shouldShowNewTag(post.date),
              })}
              key={post.slug}
            >
              <Link
                href={'the-colorado-lounge/' + post.slug}
                locale={getLocale(post.tags[0])}
              >
                <h2 className={styles['title']}>{post.title}</h2>
                <p className={styles['date']}>{getDateString(post.date)}</p>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </LayoutBlog>
  );
};

export const getStaticProps = async () => {
  generateRssFeed();

  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags']);
  return {
    props: {
      allPosts: JSON.parse(JSON.stringify(allPosts)),
    },
  };
};

export default TheColoradoLoungePage;
