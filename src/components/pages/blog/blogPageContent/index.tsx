'use client';
import { ChangeEvent, useState } from 'react';

import { Post, Tag } from '~/types/Posts';

import { PostView } from '../postView';
import { SnsView } from '../snsView';
import { TagView } from '../tagView';

import styles from './index.module.scss';
import classNames from 'classnames';

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
  allTags: Tag[];
};

export const BlogPageContent = ({ allPosts, allTags }: Props) => {
  const [tab, setTab] = useState<Tab>('posts');

  const handleTabChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTab(e.target.value as Tab);

  const content = () => {
    switch (tab) {
      case 'posts':
        return <PostView allPosts={allPosts} />;
      case 'tags':
        return <TagView allTags={allTags} />;
      case 'sns':
        return <SnsView />;
    }
  };

  return (
    <>
      <div className={styles['tabs']}>
        {Object.entries(tabMap).map(([key, value]) => (
          <label
            key={key}
            className={classNames(
              styles['tab'],
              tab === key && styles['-checked'],
            )}
          >
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
      <main className={styles['content-wrapper']}>{content()}</main>
    </>
  );
};
