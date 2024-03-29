import { ComponentProps } from 'react';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';

import { mdxSerializeConfig } from '~/utils/posts';

import { PostBlockquote } from '../postParts/postBlockquote';
import { PostCode } from '../postParts/postCode';
import { PostDivider } from '../postParts/postDivider';
import { PostFrame } from '../postParts/postFrame';
import { PostH2 } from '../postParts/postH2';
import { PostH3 } from '../postParts/postH3';
import { PostImage } from '../postParts/postImage';
import { PostLink } from '../postParts/postLink';
import { PostPara } from '../postParts/postPara';
import { PostPre } from '../postParts/postPre';
import { PostTable } from '../postParts/postTable';
import { PostToc } from '../postParts/postToc';

import 'highlight.js/styles/github-dark-dimmed.min.css';
import styles from './index.module.scss';

type Props = {
  content: MDXRemoteSerializeResult;
};

export const PostContent = ({ content }: Props) => (
  <article className={styles['post-content']}>
    <MDXRemote
      source={content}
      options={mdxSerializeConfig}
      components={components}
    />
  </article>
);

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
  pre: (props: ComponentProps<'pre'>) => <PostPre {...props} />,
  code: (props: ComponentProps<'code'>) => <PostCode {...props} />,
  nav: (props: ComponentProps<'nav'>) => <PostToc {...props} />,
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <PostBlockquote {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => <PostDivider {...props} />,
  table: (props: ComponentProps<'table'>) => <PostTable {...props} />,
  PostFrame,
};
