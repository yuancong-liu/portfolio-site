import { ComponentProps } from 'react';

import styles from './index.module.scss';

type Props = ComponentProps<'table'>;

export const PostTable = (props: Props) => (
  <table className={styles['table']} {...props} />
);
