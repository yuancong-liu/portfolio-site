'use client';
import { useRef } from 'react';

import { Variants, motion, useInView } from 'framer-motion';

import styles from './index.module.scss';

export const FilmsContent = () => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef);

  const variants: Variants = {
    hidden: { opacity: 0, x: '50vw' },
    visible: { opacity: [0, 1], x: '5vw', transition: { duration: 1.5 } },
  };

  return (
    <div className={styles['film-content']} ref={cardRef}>
      <motion.div
        className={styles['image']}
        variants={variants}
        initial="hidden"
        animate={inView && 'visible'}
      >
        Image Here
      </motion.div>
    </div>
  );
};
