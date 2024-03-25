import { Post } from '~/types/Posts';

import { PostCard } from '../postCard';

import styles from './index.module.scss';

type Props = {
  allPosts: Post[];
};

export const PostView = ({ allPosts }: Props) => (
  <ul className={styles.posts}>
    {allPosts.map((post) => (
      <PostCard key={post.slug} post={post} />
    ))}
  </ul>
);
