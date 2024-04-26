'use client';

import { CSSProperties, memo, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import styles from './index.module.scss';

export const Introduction = () => (
  <div className={styles['introduction-wrapper']}>
    <p>Hi! I am</p>
    <NameVariable />
    <p>
      Currently a front-end engineer at{' '}
      <Link
        href="https://www.kenedix.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(styles.sans, styles.company)}
      >
        Kenedix Inc.
      </Link>
    </p>
    <p>
      I like <HobbySlider />
    </p>
  </div>
);

const NameVariable = () => {
  const NAME = 'PAUL LIU,';

  const WGHT_SCALE = 800;
  const WGHT_MIN = 100;
  const SLNT_SCALE = -12;
  const SLNT_MIN = 0;

  const nameRef = useRef<HTMLParagraphElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    const wght = (WGHT_SCALE / window.innerWidth) * event.clientX + WGHT_MIN;
    const slnt = (SLNT_SCALE / window.innerHeight) * event.clientY + SLNT_MIN;

    nameRef.current?.style.setProperty('--wght', `${wght}`);
    nameRef.current?.style.setProperty('--slnt', `${slnt}`);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  return (
    <p
      className={classNames(styles.sans, styles['variable-name'])}
      ref={nameRef}
    >
      {NAME.split('').map((char, index) => {
        const key = `${char}${index}`;
        return (
          <span
            className={styles.char}
            key={key}
            style={{ '--delay': `${index * 0.3}s` } as CSSProperties}
          >
            {char}
          </span>
        );
      })}
    </p>
  );
};

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
    <span className={classNames(styles.sans, styles['hobbies-slider'])}>
      <span className={classNames(styles.entity)}>{hobbies[0]}</span>
      <span className={styles.entity}>{hobbies[1]}</span>
    </span>
  );
});

HobbySlider.displayName = 'HobbySlider';
