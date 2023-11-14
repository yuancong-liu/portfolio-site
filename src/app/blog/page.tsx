import classNames from 'classnames';
import Link from 'next/link';
import { LayoutBlog } from '~/components/layouts/blog';
import { Post } from '~/types/Posts';
import { generateRssFeed } from '~/utils/feed';
import { getAllPosts } from '~/utils/posts';
import styles from './index.module.scss';

// const BASE_URL = 'blog/';

/**
 * The Colorado Lounge page
 * ブログ画面
 *
 * /component/pages/the-colorado-lounge　配下にページコンポーネントを作成
 *
 */
const TheColoradoLoungePage = () => {
  const { allPosts } = getPosts();

  const getDateString = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${
      dateObj.getDate() - 1
    }`;
  };

  const getLocale = (languageTag: string) => {
    switch (languageTag) {
      case 'Chinese':
        return 'zh-Hant';
      case 'English':
        return 'en';
      case 'Japanese':
        return 'ja';
      default:
        return 'en';
    }
  };

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
              <Link href={post.slug} locale={getLocale(post.tags[0])}>
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

const getPosts = () => {
  generateRssFeed();

  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags']);
  return {
    allPosts: JSON.parse(JSON.stringify(allPosts)),
  };
};

export default TheColoradoLoungePage;
