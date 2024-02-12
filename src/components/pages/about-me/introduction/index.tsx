'use client';
import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import styles from './index.module.scss';

const HOBBIES = ['CSS', 'Design', 'Horror Movies'];

export const Introduction = () => {
  const [hobbies, setHobbies] = useState<string[]>(HOBBIES);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHobbies((prev) => [...prev.slice(1), prev[0]]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles['introduction-wrapper']}>
      <h2 className={classNames(styles['hi'], styles['serif'])}>Hi!</h2>
      <p className={classNames(styles['greeting'], styles['para'])}>
        I am <span className={styles['serif']}>PAUL YUANCONG LIU.</span>
      </p>
      <p className={classNames(styles['work'], styles['para'])}>
        Currently a front-end engineer at{' '}
        <span className={styles['serif']}>teamLab Inc.</span>
      </p>
      <p className={classNames(styles['hobbies'], styles['para'])}>
        I like{' '}
        <span className={classNames(styles['serif'], styles['hobbies-slider'])}>
          <motion.span
            className={classNames(styles['entity'], styles['-prev'])}
          >
            {hobbies[0]}
          </motion.span>
          <motion.span className={styles['entity']}>{hobbies[1]}</motion.span>
        </span>
      </p>
    </div>
  );
};
