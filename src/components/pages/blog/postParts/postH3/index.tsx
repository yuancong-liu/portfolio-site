'use client';
import { ComponentProps } from 'react';

import styles from './index.module.scss';

type Props = ComponentProps<'h3'>;

export const PostH3 = (props: Props) => (
  <h3 className={styles['heading-3']} {...props} />
);
