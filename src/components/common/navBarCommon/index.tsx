'use client';
import classNames from 'classnames';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

import styles from './index.module.scss';

type PageDiv = 'post' | 'other';

type Props = { pageDiv?: PageDiv };

export const NavBarCommon = ({ pageDiv = 'other' }: Props) => {
  const { scrollYProgress } = useScroll();

  const pathLength = useSpring(
    useTransform(scrollYProgress, [0, 1], [-0.01, 1.05]),
  );
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]));

  return (
    <nav className={styles['nav-bar']}>
      <ul className={styles['nav-items']}>
        {/* only displayed on PC */}
        <li className={styles['icons']}>
          <Link href="/">
            <svg
              width="103"
              height="30"
              viewBox="0 0 103 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.0028 6.81784C10.5098 6.81784 6.86749 10.4338 6.86749 14.8944C6.86749 19.3549 10.5098 22.9709 15.0028 22.9709C19.4958 22.9709 23.1381 19.3549 23.1381 14.8944C23.1381 10.4338 19.4958 6.81784 15.0028 6.81784ZM0 14.8944C0 6.66843 6.71699 0 15.0028 0C23.2886 0 30.0056 6.66843 30.0056 14.8944C30.0056 23.1203 23.2886 29.7887 15.0028 29.7887C6.71699 29.7887 0 23.1203 0 14.8944Z"
                fill="#fff"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M50.3968 6.81784C45.9354 6.81784 42.3188 10.4338 42.3188 14.8944C42.3188 19.3549 45.9354 22.9709 50.3968 22.9709C54.8582 22.9709 58.4748 19.3549 58.4748 14.8944C58.4748 10.4338 54.8582 6.81784 50.3968 6.81784ZM35.4996 14.8944C35.4996 6.66843 42.1693 0 50.3968 0C58.6243 0 65.294 6.66843 65.294 14.8944C65.294 23.1203 58.6243 29.7887 50.3968 29.7887C42.1693 29.7887 35.4996 23.1203 35.4996 14.8944Z"
                fill="#fff"
              />
              <motion.path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M80.5857 17.5166L70.9993 14.4482L73.2747 7.43875L82.8914 10.5168V0.422546H90.3081V10.4873L99.9582 7.33985L102.273 14.3367L92.6002 17.4915L98.6016 25.6592L92.6101 30L86.6021 21.8235L80.6441 29.9451L74.6492 25.6089L80.5857 17.5166Z"
                fill="#fff"
                style={{ rotate }}
              />
            </svg>
          </Link>
        </li>

        <li>
          <Link href="/blog">BLOG</Link>
        </li>
        <li>
          <Link href="/portfolio">PORTFOLIO</Link>
        </li>

        {/* only displayed on SP, also a progress bar on blog pages */}
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
            </svg>
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
