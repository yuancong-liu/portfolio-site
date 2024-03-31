import { PageHeader } from '~/components/pages/blog/pageHeader';
import { TagView } from '~/components/pages/blog/tagView';
import { getAllTags } from '~/utils/posts';

import styles from './index.module.scss';

const TagsPage = () => {
  const { allTags } = getAllTags();

  return (
    <>
      <PageHeader>Tags</PageHeader>
      <main className={styles['content-wrapper']}>
        <TagView allTags={allTags} />
      </main>
    </>
  );
};

export default TagsPage;
