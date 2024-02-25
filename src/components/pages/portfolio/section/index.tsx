import { ReactNode } from 'react';

import styles from './index.module.scss';

type Props = {
  title: string;
  children: ReactNode;
};

export const Section = ({ title, children }: Props) => {
  return (
    <div className={styles['content-wrapper']}>
      <h1 className={styles['title']}>{title}</h1>
      <div className={styles['content']}>{children}</div>
    </div>
  );
};
