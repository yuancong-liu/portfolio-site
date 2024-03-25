import { ComponentProps } from 'react';

import styles from './index.module.scss';

type Props = ComponentProps<'iframe'>;

export const PostFrame = ({ ...props }: Props) => (
  <div className={styles['iframe-wrapper']}>
    <iframe {...props} className={styles.iframe} title={props.title} />
  </div>
);
