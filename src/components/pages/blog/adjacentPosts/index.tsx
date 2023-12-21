import classNames from 'classnames';
import Link from 'next/link';

import { getAdjacentPosts } from '~/utils/posts';

import styles from './index.module.scss';

type Props = {
  /**
   * The slug of the current post.
   */
  slug: string;
};

/**
 * Displays the previous and next posts in the blog.
 */
export const AdjacentPosts = ({ slug }: Props) => {
  const { prevPost, nextPost } = getAdjacentPosts(slug);

  return (
    <div className={styles['cards-wrapper']}>
      <AdjacentPost
        title={prevPost?.title}
        slug={prevPost?.slug}
        direction="prev"
      />
      <AdjacentPost
        title={nextPost?.title}
        slug={nextPost?.slug}
        direction="next"
      />
    </div>
  );
};

type Direction = 'prev' | 'next';

type AdjacentPostsProps = {
  title?: string;
  slug?: string;
  direction: Direction;
};

const AdjacentPost = ({ title, slug, direction }: AdjacentPostsProps) => {
  if (!title || !slug) return null;

  return (
    <Link
      href={`/blog/${slug}`}
      className={classNames(styles['link-wrapper'], styles[direction])}
    >
      <div className={styles['contents']}>
        <p>{direction === 'next' ? 'Next' : 'Previous'}</p>
        <h3>{title}</h3>
      </div>
    </Link>
  );
};
