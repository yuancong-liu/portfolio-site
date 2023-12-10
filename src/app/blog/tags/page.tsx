import Link from 'next/link';
import { PageHeader } from '~/components/pages/blog/pageHeader';
import { getAllTags } from '~/utils/posts';
import styles from './index.module.scss';

const TagsPage = () => {
  const tags = getAllTags();

  return (
    <>
      <PageHeader>Tags</PageHeader>
      <main className={styles['content-wrapper']}>
        <ul className={styles['tag-list']}>
          {tags.map((tag) => (
            <li key={tag.tag} className={styles['tag-instance']}>
              <Link href={`/blog/tags/${tag.param}`}>{tag.tag}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default TagsPage;
