import { ComponentProps } from 'react';

import styles from './index.module.scss';

type Props = ComponentProps<'blockquote'>;

export const PostBlockquote = (props: Props) => (
  <blockquote className={styles.blockquote} {...props} />
);
