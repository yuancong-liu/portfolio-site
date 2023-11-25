import { FC, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './index.module.scss';

type Props = {
  src: string;
  alt?: string;
};

export const ImageWithLoading: FC<Props> = ({
  src,
  alt = '',
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={classNames(styles['image-wrapper'], {
        [styles['loading']]: loading,
      })}
    >
      <div className={styles['image']}>
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </div>
  );
};
