import { FC, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './index.module.scss';

type Props = {
  src: string;
  alt?: string;
  width: number;
  height: number;
};

export const ImageWithLoading: FC<Props> = ({
  src,
  alt = '',
  width,
  height,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={classNames(styles['image-wrapper'], {
        [styles['-loading']]: loading,
      })}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};
