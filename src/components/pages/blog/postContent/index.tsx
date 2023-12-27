'use client';
import { useMemo, useRef } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useOnHashChange } from '~/hooks/libs/useOnHashChange';

import 'highlight.js/styles/github-dark-dimmed.min.css';
import styles from './index.module.scss';

import './index.css';

type Props = {
  content: string;
};

export const PostContent = ({ content }: Props) => {
  const toc = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 100,
      },
      visible: {
        opacity: [0, 1],
        y: [1, 1],
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
    }),
    [],
  );

  const contentRef = useRef<HTMLDivElement>(null);

  // FIXME: looks strange to me
  const toggleToc = () => {
    const toc = contentRef.current?.querySelectorAll('.toc-wrapper');
    if (toc) {
      toc.forEach((item) => {
        item.classList.toggle('show');
      });
    }
  };

  useOnHashChange({ callback: toggleToc });

  // TODO: think about how to use this
  // usePostProcessing({ content: contentRef });

  const contentMemo = useMemo(
    () => (
      <motion.div
        ref={contentRef}
        variants={toc}
        initial="hidden"
        animate="visible"
        dangerouslySetInnerHTML={{ __html: content }}
        className={classNames(styles['content-wrapper'], {})}
      />
    ),
    [content, toc],
  );

  return (
    <>
      <div className={styles['toc-back-wrapper']}>
        <button className={styles['toc-button']} onClick={toggleToc}>
          On this page
        </button>
      </div>
      {contentMemo}
    </>
  );
};
