import CMark from '~/assets/icons/c-mark.svg';
import LYMark from '~/assets/icons/ly-mark.svg';
import styles from './index.module.scss';

export const IconsPc = () => {
  return (
    <div className={styles['overall-wrapper']}>
      <div className={styles['icons-wrapper']}>
        <LYMark />
        <LYMark />
        <CMark className={styles['c-mark']} />
      </div>
    </div>
  );
};