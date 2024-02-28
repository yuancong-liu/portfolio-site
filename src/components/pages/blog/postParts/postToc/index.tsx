'use client';
import { ComponentProps, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { useDeviceDetect } from '~/hooks';

import styles from './index.module.scss';
import './index.css';

type Props = ComponentProps<'nav'>;

export const PostToc = ({ className, children }: Props) => {
  const [tocOpen, setTocOpen] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const { isPc } = useDeviceDetect();

  const { contextSafe } = useGSAP({ scope: tocRef });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      '.toc-button',
      {
        backgroundColor: 'rgba(19 32 67 / 0.01)',
        backdropFilter: 'blur(0)',
      },
      {
        backgroundColor: 'rgba(19 32 67 / 0.1)',
        backdropFilter: 'blur(10px)',
        scrollTrigger: {
          trigger: isPc ? undefined : '.toc-wrapper',
          start: 'top top',
          endTrigger: '.heading',
          toggleActions: 'play none none reverse',
        },
      },
    );
  });

  const toggleToc = contextSafe(() => {
    if (tocOpen) {
      gsap.to('.top', { rotate: 0, translateY: 0, scale: 1 });
      gsap.to('.middle', { opacity: 1 });
      gsap.to('.bottom', { rotate: 0, translateY: 0, scale: 1 });
      gsap.to('.toc', { autoAlpha: 0, scaleY: 1.2, ease: 'ease-in-out' });
    } else {
      gsap.to('.top', {
        rotate: 45,
        translateY: 160,
        scale: 1.2,
        transformOrigin: '50% 50%',
      });
      gsap.to('.middle', { opacity: 0 });
      gsap.to('.bottom', {
        rotate: -45,
        translateY: -160,
        scale: 1.2,
        transformOrigin: '50% 50%',
      });
      gsap.fromTo(
        '.toc',
        {
          autoAlpha: 0,
          scaleY: 1.2,
          backgroundColor: 'rgba(19 32 67 / 0.01)',
          backdropFilter: 'blur(0)',
        },
        {
          autoAlpha: 1,
          scaleY: 1,
          backgroundColor: 'rgba(19 32 67 / 0.1)',
          backdropFilter: 'blur(10px)',
          ease: 'ease-in-out',
        },
      );
    }

    setTocOpen(!tocOpen);
  });

  return (
    <div
      className={classNames(styles['toc-back-wrapper'], 'toc-wrapper')}
      ref={tocRef}
    >
      <button
        className={classNames(
          styles['toc-button'],
          tocOpen && styles['-open'],
          'toc-button',
        )}
        onClick={toggleToc}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            className="top"
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96z"
            fill="#fff"
          />
          <path
            className="middle"
            d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
            fill="#fff"
          />
          <path
            className="bottom"
            d="M448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            fill="#fff"
          />
        </svg>
      </button>
      <nav className={classNames(className, !isPc && 'toc', styles['toc-bar'])}>
        {children}
      </nav>
    </div>
  );
};
