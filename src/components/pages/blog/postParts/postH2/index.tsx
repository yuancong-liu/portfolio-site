'use client';
import { ComponentProps } from 'react';

import { usePathname } from 'next/navigation';

import LinkIcon from '~/assets/icons/link.svg';

import styles from './index.module.scss';

type Props = ComponentProps<'h2'>;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000';

export const PostH2 = ({ children, id, ...restProps }: Props) => {
  const pathName = usePathname();
  const postUrl = `${SITE_URL}${pathName}`;

  const handleCopyLink = () =>
    navigator.clipboard.writeText(`${postUrl}#${id}`);

  return (
    <h2 className={styles['heading-2']} id={id} {...restProps}>
      {children}
      <button className={styles['copy-button']} onClick={handleCopyLink}>
        <LinkIcon className={styles['icon']} />
      </button>
    </h2>
  );
};
