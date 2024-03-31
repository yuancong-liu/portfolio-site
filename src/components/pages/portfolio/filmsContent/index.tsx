'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';

import CMark from '~/assets/icons/c-mark-sp.svg';
import { ImageWithLoading } from '~/components/common/image/imageWithLoading';
import { BREAKPOINT } from '~/hooks';

import styles from './index.module.scss';

const NIAN_NIAN_SRC =
  'https://lh3.googleusercontent.com/pw/AP1GczPKz5S8JFRjn34iMvbzLmfOUWf0TVj8SR8N8KgSLDp1e3XAjxyJVZ_quJmXniculUaDWKVpOQK6cRb6lPFEHIXpmB8BvUnU9tBH1F1PMXAkXSrqcRA=w2400';

export const FilmsContent = () => {
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      `.film-section-image`,
      {
        x: 200,
        autoAlpha: 0,
      },
      {
        duration: 1,
        x: 0,
        autoAlpha: 1,
        ease: 'back.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top top+=100',
          scroller: '.portfolio-wrapper',
          toggleActions: 'restart restart restart reverse',
        },
      },
    );

    const mm = gsap.matchMedia();
    mm.add(
      {
        pc: `(min-width: ${BREAKPOINT}px)`,
        sp: `(max-width: ${BREAKPOINT - 1}px)`,
      },
      (context) => {
        const { pc } = context.conditions!;

        gsap.fromTo(
          `.c-mark`,
          {
            scale: pc ? 1.5 : 1,
            autoAlpha: 0,
          },
          {
            duration: 1,
            y: `${pc ? 80 : 60}vh`,
            autoAlpha: 1,
            ease: 'ease-out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top top+=100',
              scroller: '.portfolio-wrapper',
              toggleActions: 'restart restart restart reverse',
            },
          },
        );
      },
    );

    gsap.to('.c-mark', {
      duration: 3,
      rotate: 360,
      repeat: -1,
      ease: 'none',
    });
  });

  return (
    <div className={styles['film-content']} ref={cardRef}>
      <Link
        href="https://youtu.be/QocgLpdHsrw?feature=shared"
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(styles.image, 'film-section-image')}
      >
        <span className={styles.redirect}>WATCH ON YOUTUBE</span>
        <ImageWithLoading
          src={NIAN_NIAN_SRC}
          alt="Thumbnail for documentary NIAN' NIAN."
        />
      </Link>
      <CMark className={classNames(styles['c-mark'], 'c-mark')} />
      <div className={styles.content}>
        <h2 className={styles.title}>NIAN&apos; NIAN.</h2>
        <p className={styles.description}>
          &quot;It&apos;s a difficult time in her life, and if she can get
          through it, i&apos;m sure she&apos;ll be happy.&quot;
        </p>
      </div>
    </div>
  );
};
