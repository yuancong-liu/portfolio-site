import { ComponentProps } from 'react';

import Link from '~/assets/icons/link.svg';
import { usePostContext } from '~/contexts/postContext';

import styles from './index.module.scss';

type Props = ComponentProps<'h2'>;

export const PostH2 = ({ children, id, ...restProps }: Props) => {
  const { postUrl } = usePostContext();

  const handleCopyLink = () =>
    navigator.clipboard.writeText(`${postUrl}#${id}`);

  return (
    <h2 className={styles['heading-2']} id={id} {...restProps}>
      {children}
      <button className={styles['copy-button']} onClick={handleCopyLink}>
        <Link className={styles['icon']} />
      </button>
    </h2>
  );
};
