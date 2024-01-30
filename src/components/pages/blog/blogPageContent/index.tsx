'use client';
import { ChangeEvent, useState } from 'react';

import { Post } from '~/types/Posts';

import { PageHeader } from '../pageHeader';
import { PostCard } from '../postCard';

import styles from './index.module.scss';

type Tab = 'posts' | 'tags' | 'sns';

type TabMap = {
  [key in Tab]: string;
};

const tabMap: TabMap = {
  posts: 'Posts',
  tags: 'Tags',
  sns: 'SNS',
};

type Props = {
  allPosts: Post[];
};

export const BlogPageContent = ({ allPosts }: Props) => {
  const [tab, setTab] = useState<Tab>('posts');

  const handleTabChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTab(e.target.value as Tab);

  return (
    <>
      {/* <PageHeader>{tabMap[tab]}</PageHeader> */}
      <div className={styles['tabs']}>
        {Object.entries(tabMap).map(([key, value]) => (
          <label key={key} className={styles['tab']}>
            <input
              type="radio"
              name="blog-div"
              value={key}
              onChange={handleTabChange}
            />
            <span className={styles['tab-name']}>{value}</span>
          </label>
        ))}
      </div>
      <main className={styles['content-wrapper']}>
        <div className={styles['posts']}>
          {allPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </main>
    </>
  );
};
