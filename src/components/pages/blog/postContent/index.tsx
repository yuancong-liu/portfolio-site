'use client';
import { ComponentProps, Suspense } from 'react';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { LoadingIndicator } from '~/components/common/loadingIndicator';
import { PostContext } from '~/contexts/postContext';

import { PostCode } from '../postParts/postCode';
import { PostH2 } from '../postParts/postH2';
import { PostH3 } from '../postParts/postH3';
import { PostImage } from '../postParts/postImage';
import { PostLink } from '../postParts/postLink';
import { PostPara } from '../postParts/postPara';
import { PostPre } from '../postParts/postPre';
import { PostToc } from '../postParts/postToc';

import 'highlight.js/styles/github-dark-dimmed.min.css';
import styles from './index.module.scss';

import './index.css';

type Props = {
  content: MDXRemoteSerializeResult;
  postUrl: string;
};

export const PostContent = ({ content, postUrl }: Props) => {
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

  // const contentRef = useRef<HTMLDivElement>(null);

  // FIXME: looks strange to me
  // const toggleToc = () => {
  //   const toc = contentRef.current?.querySelectorAll('.toc-wrapper');
  //   if (toc) {
  //     toc.forEach((item) => {
  //       item.classList.toggle('show');
  //     });
  //   }
  // };

  // useOnHashChange({ callback: toggleToc });

  return (
    <PostContext.Provider value={{ postUrl }}>
      <div className={styles['toc-back-wrapper']}>
        <button className={styles['toc-button']}>On this page</button>
      </div>
      <div className={styles['post-content']}>
        <Suspense fallback={<LoadingIndicator />}>
          <MDXRemote {...content} components={components} />
        </Suspense>
      </div>
    </PostContext.Provider>
  );
};

const components = {
  img: (props: Pick<ComponentProps<'img'>, 'src' | 'alt'>) => (
    <PostImage {...props} />
  ),
  p: (props: ComponentProps<'p'>) => <PostPara {...props} />,
  a: (props: Pick<ComponentProps<'a'>, 'href' | 'children'>) => (
    <PostLink {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => <PostH2 {...props} />,
  h3: (props: ComponentProps<'h3'>) => <PostH3 {...props} />,
  h4: (props: ComponentProps<'h4'>) => <h4 {...props} />,
  pre: (props: ComponentProps<'pre'>) => <PostPre {...props} />,
  code: (props: ComponentProps<'code'>) => <PostCode {...props} />,
  nav: (props: ComponentProps<'nav'>) => <PostToc {...props} />,
};
