'use client';
import { ComponentProps, useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import styles from './index.module.scss';

type Props = ComponentProps<'img'>;

export const PostImage = ({ alt = '', src = '' }: Props) => {
  const [loading, setLoading] = useState(true);

  return (
    <span
      className={classNames(styles['image-wrapper'], {
        [styles['loading']]: loading,
      })}
    >
      <Image
        className={styles['image']}
        src={src}
        alt={alt}
        fill
        sizes="100%"
        priority
        onLoad={() => setLoading(false)}
      />
      <span className={styles['caption']}>{alt}</span>
    </span>
  );
};
