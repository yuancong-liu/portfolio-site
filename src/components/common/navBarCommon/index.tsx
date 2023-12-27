'use client';
import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

import LogoNav from '~/assets/icons/logo-nav.svg';

import styles from './index.module.scss';

type PageDiv = 'post' | 'other';

type Props = {
  pageDiv?: PageDiv;
};

export const NavBarCommon = ({ pageDiv = 'other' }: Props) => {
  const { scrollYProgress } = useScroll();

  const pathLength = useTransform(scrollYProgress, [0, 1], [-0.01, 1]);

  return (
    <nav className={styles['nav-bar']}>
      <ul className={styles['nav-items']}>
        <li className={styles['icons']}>
          <Link href="/">
            <LogoNav />
          </Link>
        </li>
        <li>
          <Link href="/blog">BLOG</Link>
        </li>
        <li>
          <Link href="/portfolio">PORTFOLIO</Link>
        </li>
        <li className={styles['c-mark-nav']}>
          <Link href="/">
            <motion.svg
              width="32"
              height="30"
              viewBox="0 0 32 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                className={classNames(pageDiv === 'post' && styles['stroke'])}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.58568 17.5166L-0.000732422 14.4482L2.27473 7.43875L11.8914 10.5168V0.422546H19.3081V10.4873L28.9582 7.33985L31.2727 14.3367L21.6002 17.4915L27.6016 25.6592L21.6101 30L15.6021 21.8235L9.64406 29.9451L3.64918 25.6089L9.58568 17.5166Z"
                fill={pageDiv === 'post' ? 'none' : '#fff'}
                style={
                  pageDiv === 'post'
                    ? {
                        pathLength,
                      }
                    : {}
                }
              />
            </motion.svg>
          </Link>
        </li>
        <li>
          <Link href="/about-me">ABOUT ME</Link>
        </li>
        <li>
          <Link href="/and">...AND</Link>
        </li>
      </ul>
    </nav>
  );
};
