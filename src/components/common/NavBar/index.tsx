// import { Internationality } from '../Internationality';
import styles from './index.module.scss';
import Link from 'next/link';

export const NavBar = () => {
  return (
    <nav className={styles['nav-bar']}>
      <ul className={styles['nav-items']}>
        <li>
          <Link href="/about-me">ABOUT ME</Link>
        </li>
        <li>PORTFOLIO</li>
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
};
