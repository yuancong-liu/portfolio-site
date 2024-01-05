import type { NextPage } from 'next';
import Link from 'next/link';

import { NavBarCommon } from '~/components/common/navBarCommon';

import styles from './index.module.scss';

/**
 * Portfolio page
 */
const PortfolioPage: NextPage = () => {
  return (
    <>
      <NavBarCommon />
      <main className={styles['page-wrapper']}>
        <p>this is portfolio page under construction!</p>
        <ul>
          <li>
            <Link href="/portfolio/nian-nian">Nian&apos; Nian.</Link>
          </li>
        </ul>
      </main>
    </>
  );
};

export default PortfolioPage;
