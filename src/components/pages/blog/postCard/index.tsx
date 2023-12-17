'use client';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '~/types/Posts';
import { getDateString } from '~/utils/dates';
import styles from './index.module.scss';

type Language = '中文' | 'English' | '日本語';

type Props = {
  post: Post;
  index?: number;
};

export const PostCard = ({ post, index }: Props) => {
  const getLocale = (languageTag: string) => {
    switch (languageTag as Language) {
      case '中文':
        return 'zh-Hant';
      case 'English':
        return 'en';
      case '日本語':
        return 'ja';
    }
  };

  const shouldShowNewTag = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays <= 30;
  };

  return (
    <motion.div
      className={classNames(styles['card-wrapper'], {
        [styles['-new']]: shouldShowNewTag(post.date),
      })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.02 * (index ?? 0) }}
    >
      <Link
        className={styles['post-card']}
        href={`/blog/${post.slug}`}
        locale={getLocale(post.language)}
      >
        <div className={styles['title-area']}>
          <h2 className={styles['title']}>{post.title}</h2>
          {post.language !== 'English' && (
            <span className={styles['language-tag']}>{post.language}</span>
          )}
        </div>
        <p className={styles['date']}>{getDateString(post.date)}</p>
      </Link>
    </motion.div>
  );
};
