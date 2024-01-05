import { PageHeader } from '~/components/pages/blog/pageHeader';
import { PostCard } from '~/components/pages/blog/postCard';
import { getAllTags, getPostsByTag } from '~/utils/posts';

import styles from './index.module.scss';

type Props = {
  params: { tag: string };
};

const TagPage = ({ params }: Props) => {
  const realTag = getAllTags().find((tag) => tag.param === params.tag);
  const posts = getPostsByTag(realTag!.tag);

  return (
    <>
      <PageHeader>{realTag!.tag}</PageHeader>
      <main className={styles['content-wrapper']}>
        <div className={styles['posts']}>
          {posts.map((post, index) => {
            return <PostCard key={post.slug} post={post} index={index} />;
          })}
        </div>
      </main>
    </>
  );
};

export const generateStaticParams = () => {
  const tags = getAllTags();

  return tags.map((tag) => {
    return { tag: tag.param };
  });
};

export default TagPage;
