import { PageHeader } from '~/components/pages/blog/pageHeader';

import styles from './index.module.scss';

const TagsPage = () => {
  return (
    <>
      <PageHeader>Tags</PageHeader>
      <main className={styles['content-wrapper']}></main>
    </>
  );
};

export default TagsPage;
