import { ComponentProps } from 'react';

import styles from './index.module.scss';

type Props = ComponentProps<'hr'>;

export const PostDivider = (props: Props) => (
  <hr className={styles['divider']} {...props} />
);
