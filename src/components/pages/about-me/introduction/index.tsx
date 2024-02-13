'use client';
import { memo, useEffect, useState } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import styles from './index.module.scss';

export const Introduction = () => {
  return (
    <div className={styles['introduction-wrapper']}>
      <h2 className={classNames(styles['hi'], styles['serif'])}>Hi!</h2>
      <p className={classNames(styles['greeting'], styles['para'])}>
        I am <NameSparkle />
      </p>
      <p className={classNames(styles['work'], styles['para'])}>
        Currently a front-end engineer at{' '}
        <span className={styles['serif']}>teamLab Inc.</span>
      </p>
      <p className={classNames(styles['hobbies'], styles['para'])}>
        I like <HobbySlider />
      </p>
    </div>
  );
};

/**
 * NAME
 */
type Name = {
  lang: string;
  name: string;
};

const NAME = [
  { lang: 'en', name: 'PAUL LIU / PAUL LIU / PAUL LIU' },
  { lang: 'cn', name: '劉元聰 / 劉元聰 / 劉元聰 / 劉元聰 / 劉元聰' },
  { lang: 'jp', name: 'リュウ ゲンソウ / リュウ ゲンソウ / リュウ ゲンソウ' },
  { lang: 'kr', name: '유원총 / 유원총 / 유원총 / 유원총 / 유원총' },
] as Name[];

const NameSparkle = memo(() => {
  const [showNames, setShowNames] = useState<boolean>(false);

  const nameVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
      transitionEnd: {
        display: 'none',
      },
    },
    visible: {
      display: 'block',
      opacity: [0, 0.5, 0.5],
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  const handleTap = () => {
    if (!showNames) {
      setShowNames(true);
      setTimeout(() => {
        setShowNames(false);
      }, 2000);
    }
  };

  return (
    <motion.span
      className={classNames(
        styles['serif'],
        styles['name-sparkle'],
        showNames && styles['-show'],
      )}
      onTap={handleTap}
      onMouseEnter={() => setShowNames(true)}
      onMouseLeave={() => setShowNames(false)}
    >
      PAUL Yuancong LIU.
      {NAME.map((name) => (
        <motion.span
          variants={nameVariants}
          initial="hidden"
          animate={showNames ? 'visible' : 'hidden'}
          onAnimationComplete={() => setShowNames((prev) => !prev)}
          key={name.lang}
          className={classNames(styles['entity'], styles[name.lang])}
        >
          {name.name}
        </motion.span>
      ))}
    </motion.span>
  );
});

NameSparkle.displayName = 'NameSparkle';

/**
 * HOBBIES
 */
const HOBBIES = ['CSS', 'Design', 'Horror Movies'];

const HobbySlider = memo(() => {
  const [hobbies, setHobbies] = useState<string[]>(HOBBIES);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHobbies((prev) => [...prev.slice(1), prev[0]]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <span className={classNames(styles['serif'], styles['hobbies-slider'])}>
      <motion.span className={classNames(styles['entity'], styles['-prev'])}>
        {hobbies[0]}
      </motion.span>
      <motion.span className={styles['entity']}>{hobbies[1]}</motion.span>
    </span>
  );
});

HobbySlider.displayName = 'HobbySlider';
