'use client';

import { useRef } from 'react';

import styles from './index.module.scss';

type Props = {
  /**
   * Text to scroll
   */
  text: string;
  /**
   * Font size in rem
   * @default 12
   */
  size?: number;
  /**
   * HTML tag to render
   * @default 'h2'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const ScrollingText = ({ text, size = 12, as = 'h2' }: Props) => {
  const As = as;
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleScroll = () =>
    titleRef.current?.appendChild(titleRef.current?.firstElementChild as Node);

  titleRef.current?.addEventListener('animationiteration', handleScroll);

  return (
    <As
      className={styles['scrolling-text']}
      ref={titleRef}
      style={{ fontSize: `${size}rem` }}
    >
      <span>{text}</span>
      <span>{text}</span>
    </As>
  );
};
