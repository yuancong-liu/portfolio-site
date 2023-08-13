import LYMark from '~/assets/icons/ly-mark-sp.svg';
import CMark from '~/assets/icons/c-mark-sp.svg';
import styles from './index.module.scss';

export const TopIconsSp = () => {
  return (
      <div className={styles['overall-wrapper']}>
        <div className={styles['icons-wrapper']}>
          <LYMark />
          <LYMark />
          <CMark className={styles['c-mark']}/>
        </div>
      </div>
    )
};