'use client';

import { useRef } from 'react';

import styles from './index.module.scss';

export const PageTitle = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleScroll = () =>
    titleRef.current?.appendChild(titleRef.current?.firstElementChild as Node);

  titleRef.current?.addEventListener('animationiteration', handleScroll);

  return (
    <h2 className={styles['page-title']} ref={titleRef}>
      <span>PORTFOLIO</span>
      <span>PORTFOLIO</span>
    </h2>
  );
};
