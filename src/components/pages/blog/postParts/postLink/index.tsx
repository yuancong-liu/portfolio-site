'use client';

import { ComponentProps } from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import { usePostTocContext } from '~/contexts/postTocContext';

import styles from './index.module.scss';

type Props = Pick<ComponentProps<'a'>, 'href' | 'children'>;

export const PostLink = ({ href = '', children }: Props) => {
  const { toc } = usePostTocContext();

  return (
    <Link
      href={href}
      className={classNames(styles.link, toc && styles['-toc'])}
    >
      {children}
    </Link>
  );
};
