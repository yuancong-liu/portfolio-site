import { Post } from '~/types/Posts';

import { PostCard } from '../postCard';

import styles from './index.module.scss';

type Props = {
  allPosts: Post[];
};

export const PostView = ({ allPosts }: Props) => {
  return (
    <div className={styles['posts']}>
      {allPosts.map((post, index) => (
        <PostCard key={post.slug} post={post} index={index} />
      ))}
    </div>
  );
};
