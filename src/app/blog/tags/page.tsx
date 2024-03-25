import { PageHeader } from '~/components/pages/blog/pageHeader';

import styles from './index.module.scss';

const TagsPage = () => (
  <>
    <PageHeader>Tags</PageHeader>
    <main className={styles['content-wrapper']} />
  </>
);

export default TagsPage;
