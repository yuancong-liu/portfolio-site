'use client';
import { useMemo, useRef } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import './index.css';

type Props = {
  content: string;
};

export const PostContent = ({ content }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // TODO: think about how to use this
  // usePostProcessing({ content: contentRef });

  // FIXME: looks strange to me
  const toggleToc = () => {
    const toc = contentRef.current?.querySelectorAll('.toc-wrapper');
    console.log(toc);
    if (toc) {
      toc.forEach((item) => {
        item.classList.toggle('show');
      });
    }
  };

  const contentMemo = useMemo(
    () => (
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: content }}
        className={classNames(styles['content-wrapper'], {})}
      />
    ),
    [content],
  );

  return (
    <>
      <button className={styles['toc-button']} onClick={toggleToc}>
        目次
      </button>
      {contentMemo}
    </>
  );
};
