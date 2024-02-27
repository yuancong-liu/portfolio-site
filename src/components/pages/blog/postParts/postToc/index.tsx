'use client';
import { ComponentProps, useMemo, useState } from 'react';

import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import gsap from 'gsap';

import { useDeviceDetect } from '~/hooks';

import styles from './index.module.scss';
import './index.css';

type Props = ComponentProps<'nav'>;

export const PostToc = ({ className, children }: Props) => {
  const [tocOpen, setTocOpen] = useState(false);
  const { isPc } = useDeviceDetect();

  const { contextSafe } = useGSAP();

  const toggleToc = contextSafe(() => {
    if (tocOpen) {
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
      gsap.fromTo('.toc', { autoAlpha: 0 }, { autoAlpha: 1 });
    } else {
      gsap.to('.top', { rotate: 0, translateY: 0, scale: 1 });
      gsap.to('.middle', { opacity: 1 });
      gsap.to('.bottom', { rotate: 0, translateY: 0, scale: 1 });
      gsap.to('.toc', { autoAlpha: 0 });
    }

    setTocOpen(!tocOpen);
  });

  return (
    <div className={styles['toc-back-wrapper']}>
      <button
        className={classNames(styles['toc-button'], tocOpen && styles['-open'])}
        onClick={toggleToc}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <motion.path
            // initial="close"
            // variants={barTop}
            // animate={tocOpen ? 'open' : 'close'}
            className="top"
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96z"
            fill="#fff"
          />
          <motion.path
            // initial="close"
            // variants={barMiddle}
            // animate={tocOpen ? 'open' : 'close'}
            className="middle"
            d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
            fill="#fff"
          />
          <motion.path
            // initial="close"
            // variants={barBottom}
            // animate={tocOpen ? 'open' : 'close'}
            className="bottom"
            d="M448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            fill="#fff"
          />
        </svg>
      </button>
      <motion.nav
        // variants={toc}
        // initial={tocInitialStatus}
        // animate={tocAnimateStatus}
        className={classNames(className, !isPc && 'toc', styles['toc-bar'])}
      >
        {children}
      </motion.nav>
    </div>
  );
};
