'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './index.module.scss';

/**
 * Not found page
 */
export const FourOhFourPage = () => {
  const pathname = usePathname();

  return (
    <main className={styles['page-wrapper']}>
      <div className={styles['content']}>
        <h3 className={styles['oops']}>Oops!</h3>
        <h1 className={styles['title']}>404</h1>
        <code className={styles['pathname']}>{pathname}</code>
        <p>This page could not be found.</p>
        <Link href="/">Back to HOME page</Link>
      </div>
    </main>
  );
};
