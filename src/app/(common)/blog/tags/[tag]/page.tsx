import { PageHeader } from '~/components/pages/blog/pageHeader';
import { PostView } from '~/components/pages/blog/postView';
import { getAllTags, getPostsByTag } from '~/utils/posts';

import styles from './index.module.scss';

type Props = {
  params: { tag: string };
};

const TagPage = ({ params }: Props) => {
  const realTag = getAllTags().allTags.find((tag) => tag.param === params.tag);
  const posts = getPostsByTag(realTag!.tag);

  return (
    <>
      <PageHeader>{realTag!.tag}</PageHeader>
      <main className={styles['content-wrapper']}>
        <PostView allPosts={posts} />
      </main>
    </>
  );
};

export const generateStaticParams = () => {
  const { allTags } = getAllTags();

  return allTags.map((tag) => {
    return { tag: tag.param };
  });
};

export default TagPage;
