'use client';
import { ReactNode, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import styles from './index.module.scss';

type Props = {
  title: string;
  children: ReactNode;
};

export const Section = ({ title, children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      `.char-${title}`,
      {
        y: 200,
        autoAlpha: 0,
      },
      {
        duration: 1,
        y: 0,
        autoAlpha: 1,
        stagger: 0.05,
        ease: 'back.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top+=100',
          scroller: '.content-wrapper',
          toggleActions: 'restart reset restart reset',
          onEnter: () => console.log('enter', title),
        },
      },
    );
  });

  return (
    <div className={styles['content-wrapper']} ref={containerRef}>
      <h1 className={styles['title']}>
        {title.split('').map((char) => (
          <span
            key={char}
            className={classNames(styles['char'], `char-${title}`)}
          >
            {char}
          </span>
        ))}
      </h1>
      <div className={styles['content']}>{children}</div>
    </div>
  );
};
