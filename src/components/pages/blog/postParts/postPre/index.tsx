'use client';
import { ComponentProps } from 'react';

import styles from './index.module.scss';

type Props = ComponentProps<'pre'>;

export const PostPre = ({ ...restProps }: Props) => (
  <pre className={styles['preformatted']} {...restProps} />
);
