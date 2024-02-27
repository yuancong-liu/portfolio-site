import { Variants, motion } from 'framer-motion';

import styles from './index.module.scss';

export const IconsPc = () => {
  const cMarkPath: Variants = {
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
          width="358"
          height="355"
          viewBox="0 0 358 355"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M178.527 81.1323C125.062 81.1323 81.72 124.163 81.72 177.243C81.72 230.323 125.062 273.354 178.527 273.354C231.992 273.354 275.334 230.323 275.334 177.243C275.334 124.163 231.992 81.1323 178.527 81.1323ZM0 177.243C0 79.3544 79.9292 0 178.527 0C277.125 0 357.054 79.3544 357.054 177.243C357.054 275.132 277.125 354.486 178.527 354.486C79.9292 354.486 0 275.132 0 177.243Z"
            fill="#fff"
          />
        </motion.svg>

        <motion.svg
          variants={lYMark}
          initial="hidden"
          animate="visible"
          width="358"
          height="355"
          viewBox="0 0 358 355"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M178.527 81.1323C125.062 81.1323 81.72 124.163 81.72 177.243C81.72 230.323 125.062 273.354 178.527 273.354C231.992 273.354 275.334 230.323 275.334 177.243C275.334 124.163 231.992 81.1323 178.527 81.1323ZM0 177.243C0 79.3544 79.9292 0 178.527 0C277.125 0 357.054 79.3544 357.054 177.243C357.054 275.132 277.125 354.486 178.527 354.486C79.9292 354.486 0 275.132 0 177.243Z"
            fill="#fff"
          />
        </motion.svg>

        <motion.svg
          variants={cMark}
          initial="hidden"
          animate="visible"
          whileHover={{
            rotate: 360,
            transition: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 3,
              ease: 'easeInOut',
            },
          }}
          className={styles['c-mark']}
          width="373"
          height="352"
          viewBox="0 0 373 352"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            variants={cMarkPath}
            initial="hidden"
            animate="visible"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M114.933 203.448L0.859375 166.934L27.9364 83.5209L142.37 120.15V0.0281677H230.627V119.799L345.458 82.344L373 165.607L257.901 203.149L329.315 300.345L258.019 352L186.527 254.699L115.628 351.347L44.2917 299.746L114.933 203.448Z"
            fill="#fff"
          />
        </motion.svg>
      </div>
    </div>
  );
};
