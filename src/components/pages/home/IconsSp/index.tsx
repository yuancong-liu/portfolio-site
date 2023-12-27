import { motion } from 'framer-motion';

import styles from './index.module.scss';

export const IconsSp = () => {
    const cMarkPath = {
      hidden: {
        pathLength: 0,
        fill: 'rgba(255, 255, 255, 0)',
      },
      visible: {
        pathLength: [0, 1, 1],
        fill: [
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 1)',
        ],
        transition: {
          duration: 3,
          ease: 'easeInOut',
        },
      },
    };

    const cMark = {
      hidden: {
        rotate: 180,
      },
      visible: {
        rotate: [180, 0, 0],
        transition: {
          duration: 3,
          ease: 'easeInOut',
        },
      },
    };

    const lYMark = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: [0, 0, 1],
        transition: {
          duration: 3,
          ease: 'easeInOut',
        },
      },
    };

  return (
    <div className={styles['overall-wrapper']}>
      <div className={styles['icons-wrapper']}>
        <motion.svg
          variants={lYMark}
          initial="hidden"
          animate="visible"
          width="195"
          height="194"
          viewBox="0 0 195 194"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M97.777 44.3692C68.7621 44.3692 45.2408 67.9014 45.2408 96.9297C45.2408 125.958 68.7621 149.49 97.777 149.49C126.792 149.49 150.313 125.958 150.313 96.9297C150.313 67.9014 126.792 44.3692 97.777 44.3692ZM0.89209 96.9297C0.89209 43.3969 44.2689 0 97.777 0C151.285 0 194.662 43.3969 194.662 96.9297C194.662 150.463 151.285 193.859 97.777 193.859C44.2689 193.859 0.89209 150.463 0.89209 96.9297Z"
            fill="#fff"
          />
        </motion.svg>

        <motion.svg
          variants={lYMark}
          initial="hidden"
          animate="visible"
          width="195"
          height="194"
          viewBox="0 0 195 194"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M97.777 44.3692C68.7621 44.3692 45.2408 67.9014 45.2408 96.9297C45.2408 125.958 68.7621 149.49 97.777 149.49C126.792 149.49 150.313 125.958 150.313 96.9297C150.313 67.9014 126.792 44.3692 97.777 44.3692ZM0.89209 96.9297C0.89209 43.3969 44.2689 0 97.777 0C151.285 0 194.662 43.3969 194.662 96.9297C194.662 150.463 151.285 193.859 97.777 193.859C44.2689 193.859 0.89209 150.463 0.89209 96.9297Z"
            fill="#fff"
          />
        </motion.svg>

        <motion.svg
          variants={cMark}
          initial="hidden"
          animate="visible"
          whileTap={{
            scale: 0.9,
            rotate: 45,
          }}
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
            fill="#fff"
          />
        </motion.svg>
      </div>
    </div>
  );
};
