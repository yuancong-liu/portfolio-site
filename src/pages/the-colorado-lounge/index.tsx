import type { NextPage } from 'next';
import Link from 'next/link';
import { LayoutBlog } from '~/components/layouts/the-colorado-lounge';
import { Post } from '~/types/Posts';
import { getAllPosts } from '~/utils/posts';
import styles from './index.module.scss';

/**
 * The Colorado Lounge page
 * ブログ画面
 *
 * /component/pages/the-colorado-lounge　配下にページコンポーネントを作成
 *
 */
const TheColoradoLoungePage: NextPage<{ allPosts: Post[] }> = ({ allPosts }) => {

  const getDateString = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate() - 1}`;
  }

  const getLocale = (languageTag: string) => {
    switch (languageTag) {
      case "Chinese":
        return "zh-Hant";
      case "English":
        return "en";
      case "Japanese":
        return "ja";
      default:
        return "en";
    }
  }
  
  return (
    <LayoutBlog>
      <main className={styles['content-wrapper']}>
        <h1>The Colorado Lounge</h1>
        <div>
          {allPosts.map((post: Post) => (
            <Link key={post.slug} href={"the-colorado-lounge/" + post.slug} locale={getLocale(post.tags[0])}>
              <a>
                <h2>{post.title}</h2>
                <p>{getDateString(post.date)}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </LayoutBlog>
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
