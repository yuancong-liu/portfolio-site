// import { Internationality } from '../Internationality';
import Link from 'next/link';

import styles from './index.module.scss';

export const NavBarHome = () => (
  <nav className={styles['nav-bar']}>
    <ul className={styles['nav-items']}>
      <li>
        <Link href="/about-me">ABOUT ME</Link>
      </li>
      <li>
        <Link href="/portfolio">PORTFOLIO</Link>
      </li>
      <li>
        <Link href="/blog">BLOG</Link>
      </li>
      <li>
        <Link href="/and">...AND</Link>
      </li>
      {/* TODO: i18n */}
      {/* <li>
          <Internationality />
        </li> */}
    </ul>
  </nav>
);
