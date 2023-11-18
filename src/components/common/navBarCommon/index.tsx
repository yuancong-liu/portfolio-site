import Link from 'next/link';
import styles from './index.module.scss';

export const NavBarCommon = () => {
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
      </ul>
    </nav>
  );
};
