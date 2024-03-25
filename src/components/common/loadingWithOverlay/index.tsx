'use client';

import { Variants, motion } from 'framer-motion';

import styles from './index.module.scss';

export const LoadingWithOverlay = () => {
  const cMarkPath = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  } as Variants;

  return (
    <div className={styles['indicator-overlay']}>
      <svg
        className={styles['c-mark']}
        width="201"
        height="191"
        viewBox="0 0 201 191"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={cMarkPath}
          initial="hidden"
          animate="visible"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M61.6135 110.402L0 90.5905L14.6248 45.3339L76.4325 65.2074V0.0340576H124.102V65.0168L186.124 44.6954L201 89.8705L138.833 110.239L177.405 162.974L138.896 191L100.282 138.209L61.9887 190.646L23.4586 162.649L61.6135 110.402Z"
          fill="none"
          stroke="#fff"
        />
      </svg>
    </div>
  );
};
