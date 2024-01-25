'use client';
import { ComponentProps } from 'react';

import styles from './index.module.scss';

type Props = ComponentProps<'p'>;

export const PostPara = (props: Props) => (
  <p className={styles['paragraph']} {...props} />
);
