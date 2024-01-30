import Link from 'next/link';

import { Tag } from '~/types/Posts';

import styles from './index.module.scss';

type Props = {
  allTags: Tag[];
};

export const TagView = ({ allTags }: Props) => {
  return (
    <ul className={styles['tag-list']}>
      {allTags.map((tag) => (
        <li key={tag.tag} className={styles['tag-instance']}>
          <Link href={`/blog/tags/${tag.param}`}>{tag.tag}</Link>
        </li>
      ))}
    </ul>
  );
};
