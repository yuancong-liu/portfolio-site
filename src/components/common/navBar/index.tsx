'use client';

import { MouseEventHandler, useRef, useState } from 'react';

import classNames from 'classnames';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sqrtAnyNum } from '~/utils/math';

import styles from './index.module.scss';

export const NavBar = () => {
  /**
   * Scroll animation for the navbar
   */
  const { scrollYProgress } = useScroll();

  const pathLength = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0]));
  const fill = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [
      'rgba(255, 255, 255, 0)',
      'rgba(255, 255, 255, 0)',
      'rgba(255, 255, 255, 1)',
    ],
  );

  const currentPath = usePathname();
  const isActive = (path: string) => currentPath.startsWith(path);

  /**
   * Hover effect for the navbar
   */
  const navBarRef = useRef<HTMLElement>(null);

  type NavTranslate = {
    x: number;
    y: number;
  };

  const [navTranslate, setNavTranslate] = useState<NavTranslate>({
    x: 0,
    y: 0,
  });

  const handleMouseMove: MouseEventHandler = (event) => {
    if (!navBarRef.current) return;
    const rect = navBarRef.current?.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setNavTranslate({
      x: sqrtAnyNum(event.clientX - centerX) / 2,
      y: sqrtAnyNum(event.clientY - centerY) / 2,
    });

    navBarRef.current.style.setProperty(
      '--x',
      `${event.clientX - rect.left - 20}px`,
    );
    navBarRef.current.style.setProperty(
      '--y',
      `${event.clientY - rect.top - 20}px`,
    );
  };

  return (
    <motion.nav
      className={styles['nav-bar']}
      ref={navBarRef}
      onMouseMove={handleMouseMove}
      whileHover={{
        translateX: navTranslate.x,
        translateY: navTranslate.y,
      }}
    >
      <ul className={styles['nav-items']}>
        <li className={styles['nav-item']}>
          <Link
            href="/blog"
            className={classNames(
              styles['text-link'],
              isActive('/blog') && styles['-active'],
            )}
          >
            BLOG
          </Link>
        </li>
        <li className={styles['nav-item']}>
          <Link
            href="/portfolio"
            className={classNames(
              styles['text-link'],
              isActive('/portfolio') && styles['-active'],
            )}
          >
            PORTFOLIO
          </Link>
        </li>

        <li className={styles['c-mark-nav']}>
          <Link href="/">
            <svg
              width="32"
              height="30"
              viewBox="0 0 32 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                className={classNames(styles['text-link'], styles.stroke)}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.58568 17.5166L-0.000732422 14.4482L2.27473 7.43875L11.8914 10.5168V0.422546H19.3081V10.4873L28.9582 7.33985L31.2727 14.3367L21.6002 17.4915L27.6016 25.6592L21.6101 30L15.6021 21.8235L9.64406 29.9451L3.64918 25.6089L9.58568 17.5166Z"
                fill={fill}
                whileHover={{
                  rotate: 360,
                  scale: 0.8,
                  transition: { duration: 1 },
                }}
                style={{
                  pathLength,
                }}
              />
            </svg>
          </Link>
        </li>

        <li className={styles['nav-item']}>
          <Link
            href="/about-me"
            className={classNames(
              styles['text-link'],
              isActive('/about-me') && styles['-active'],
            )}
          >
            ABOUT ME
          </Link>
        </li>
        <li className={styles['nav-item']}>
          <Link
            href="/and"
            className={classNames(
              styles['text-link'],
              isActive('/and') && styles['-active'],
            )}
          >
            ...AND
          </Link>
        </li>
      </ul>
    </motion.nav>
  );
};
