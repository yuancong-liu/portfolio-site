'use client';
import { ComponentProps, useMemo, useState } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { PostTocContext } from '~/contexts/postTocContext';
import { useDeviceDetect } from '~/hooks';

import styles from './index.module.scss';
import './index.css';

type Props = ComponentProps<'nav'>;

export const PostToc = ({ className, children }: Props) => {
  const [tocOpen, setTocOpen] = useState(false);
  const { isPc } = useDeviceDetect();

  const toc = useMemo(
    () => ({
      hidden: {
        opacity: [1, 0],
        scaleY: [1, 1.2],
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
        transitionEnd: {
          display: 'none',
        },
      },
      visible: {
        opacity: [0, 1],
        scaleY: [1.2, 1],
        display: 'block',
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
    }),
    [],
  );

  const barTop = useMemo(
    () => ({
      close: {
        rotate: 0,
        translateY: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
      open: {
        rotate: 45,
        translateY: 160,
        scale: 1.2,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
    }),
    [],
  );

  const barMiddle = useMemo(
    () => ({
      close: {
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
      open: {
        opacity: 0,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
    }),
    [],
  );

  const barBottom = useMemo(
    () => ({
      close: {
        rotate: 0,
        translateY: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
      open: {
        rotate: -45,
        translateY: -160,
        scale: 1.2,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
    }),
    [],
  );

  const toggleToc = () => setTocOpen(!tocOpen);

  const tocInitialStatus = isPc ? 'visible' : 'hidden';
  const tocAnimateStatus = isPc ? undefined : tocOpen ? 'visible' : 'hidden';

  return (
    <PostTocContext.Provider value={{ toc: true }}>
      <div className={styles['toc-back-wrapper']}>
        <button
          className={classNames(
            styles['toc-button'],
            tocOpen && styles['-open'],
          )}
          onClick={toggleToc}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <motion.path
              initial="close"
              variants={barTop}
              animate={tocOpen ? 'open' : 'close'}
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96z"
              fill="#fff"
            />
            <motion.path
              initial="close"
              variants={barMiddle}
              animate={tocOpen ? 'open' : 'close'}
              d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
              fill="#fff"
            />
            <motion.path
              initial="close"
              variants={barBottom}
              animate={tocOpen ? 'open' : 'close'}
              d="M448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              fill="#fff"
            />
          </svg>
        </button>
        <motion.nav
          variants={toc}
          initial={tocInitialStatus}
          animate={tocAnimateStatus}
          className={classNames(className, styles['toc-bar'])}
        >
          {children}
        </motion.nav>
      </div>
    </PostTocContext.Provider>
  );
};
