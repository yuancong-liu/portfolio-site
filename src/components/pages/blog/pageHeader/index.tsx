import styles from './index.module.scss';

type Props = {
  children: string;
};

export const PageHeader = ({ children }: Props) => (
  <header className={styles['header-wrapper']}>
    <h1 className={styles.title}>{children}</h1>
  </header>
);
