'use client';
import { Suspense, useMemo, useRef } from 'react';

import classNames from 'classnames';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { useOnHashChange } from '~/hooks/libs/useOnHashChange';

import 'highlight.js/styles/github-dark-dimmed.min.css';
import styles from './index.module.scss';

import './index.css';
import { ImageWithLoading } from '~/components/common/image/imageWithLoading';
import { LoadingIndicator } from '~/components/common/loadingIndicator';

type Props = {
  content: MDXRemoteSerializeResult;
};

export const PostContent = ({ content }: Props) => {
  const toc = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        lineHeight: 2,
      },
      visible: {
        opacity: [0, 1],
        lineHeight: [2, 1.5],
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

  return (
    <>
      <div className={styles['toc-back-wrapper']}>
        <button className={styles['toc-button']} onClick={toggleToc}>
          On this page
        </button>
      </div>
      <Suspense fallback={<LoadingIndicator />}>
        <MDXRemote {...content} components={components} />
      </Suspense>
    </>
  );
};

const components = {
  img: (props: any) => {
    return <ImageWithLoading {...props} />;
  },
  p: (props: any) => {
    return <p {...props} />;
  },
};
