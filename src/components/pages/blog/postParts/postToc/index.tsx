'use client';
import { ComponentProps, useState } from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';
import './index.css';

type Props = ComponentProps<'nav'>;

export const PostToc = ({ className, ...props }: Props) => {
  const [tocOpen, setTocOpen] = useState(false);

  // const toc = useMemo(
  //   () => ({
  //     hidden: {
  //       opacity: 0,
  //       lineHeight: 2,
  //     },
  //     visible: {
  //       opacity: [0, 1],
  //       lineHeight: [2, 1.5],
  //       transition: {
  //         duration: 0.5,
  //         ease: 'easeInOut',
  //       },
  //     },
  //   }),
  //   [],
  // );

  const toggleToc = () => setTocOpen(!tocOpen);

  return (
    <div className={styles['toc-back-wrapper']}>
      <button
        className={classNames(styles['toc-button'], tocOpen && styles['-open'])}
        onClick={toggleToc}
      >
        On this page
      </button>
      <nav
        className={classNames(
          className,
          styles['toc-bar'],
          tocOpen && styles['-open'],
        )}
        {...props}
      />
    </div>
  );
};
