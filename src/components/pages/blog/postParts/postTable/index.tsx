import { ComponentProps } from 'react';

import styles from './index.module.scss';

type Props = ComponentProps<'table'>;

export const PostTable = (props: Props) => (
  <div className={styles['table-wrapper']}>
    <table className={styles['table']} {...props} />
  </div>
);
