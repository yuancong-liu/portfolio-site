'use client';

import { useState } from 'react';

import classNames from 'classnames';
import Image, { ImageProps } from 'next/image';

import styles from './index.module.scss';

type Props = {
  src: string;
  alt?: string;
  style?: ImageProps['style'];
  className?: ImageProps['className'];
};

export const ImageWithLoading = ({
  src,
  alt = 'Alt for image',
  style,
  className,
}: Props) => {
  const [loading, setLoading] = useState(true);

  return (
    <span
      className={classNames(
        styles['image-wrapper'],
        {
          [styles.loading]: loading,
        },
        className,
      )}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100%"
        priority
        onLoad={() => setLoading(false)}
      />
    </span>
  );
};
