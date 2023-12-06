'use client';
import { useMemo, useRef } from 'react';
import classNames from 'classnames';
import { useOnHashChange } from '~/hooks/libs/useOnHashChange';
import styles from './index.module.scss';
import './index.css';

type Props = {
  content: string;
};

export const PostContent = ({ content }: Props) => {
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

  useOnHashChange({callback: toggleToc});

  // TODO: think about how to use this
  // usePostProcessing({ content: contentRef });


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
      <div className={styles['toc-back-wrapper']}>
        <button className={styles['toc-button']} onClick={toggleToc}>
          On this page
        </button>
      </div>
      {contentMemo}
    </>
  );
};
