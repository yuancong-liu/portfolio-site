import Link from 'next/link';
import { getAllTags } from '~/utils/posts';
import styles from './index.module.scss';

const TagsPage = () => {
  const tags = getAllTags();

  return (
    <main className={styles['content-wrapper']}>
      <h1 className={styles['title']}>Tags</h1>
      <ul className={styles['tag-list']}>
        {tags.map((tag) => (
          <li key={tag.tag} className={styles['tag-instance']}>
            <Link href={`/blog/tags/${tag.param}`}>{tag.tag}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TagsPage;
