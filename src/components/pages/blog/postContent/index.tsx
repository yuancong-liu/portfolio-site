'use client';
import { ComponentProps, useRef } from 'react';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { PostContext } from '~/contexts/postContext';

import { PostBlockquote } from '../postParts/postBlockquote';
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
import { PostDivider } from '../postParts/postDivider';
import { PostTable } from '../postParts/postTable';

type Props = {
  content: MDXRemoteSerializeResult;
  postUrl: string;
};

export const PostContent = ({ content, postUrl }: Props) => {
  return (
    <PostContext.Provider value={{ postUrl }}>
      <div className={styles['post-content']}>
        <MDXRemote {...content} components={components} />
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
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <PostBlockquote {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => <PostDivider {...props} />,
  table: (props: ComponentProps<'table'>) => <PostTable {...props} />,
};
