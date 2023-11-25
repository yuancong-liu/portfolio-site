import FourOhFourPage from '~/components/pages/404';
import { PostCard } from '~/components/pages/blog/postCard';
import { getAllTags, getPostsByTag } from '~/utils/posts';
import styles from './index.module.scss';

type Props = {
  params: { tag: string };
};

const TagPage = ({ params }: Props) => {
  const realTag = getAllTags().find((tag) => tag.param === params.tag);
  if (!realTag) return <FourOhFourPage />;
  const posts = getPostsByTag(realTag.tag);

  return (
    <main className={styles['content-wrapper']}>
      <h1 className={styles['title']}>{realTag.tag}</h1>
      <div className={styles['posts']}>
        {posts.map((post) => {
          return <PostCard key={post.slug} post={post} />;
        })}
      </div>
    </main>
  );
};

export const generateStaticParams = () => {
  const tags = getAllTags();

  return tags.map((tag) => {
    return { tag: tag.param };
  });
};

export default TagPage;
