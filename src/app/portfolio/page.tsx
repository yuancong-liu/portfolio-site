import type { NextPage } from 'next';

import styles from './index.module.scss';

/**
 * Portfolio page
 */
const PortfolioPage: NextPage = () => {
  return (
    <main className={styles['content-wrapper']}>
      {/* introduction */}
      <section className={styles['block']}>
        <h1>#1</h1>
      </section>

      {/* experiences */}
      <section className={styles['block']}>
        <h1>#2</h1>
      </section>
    </main>
  );
};

export default PortfolioPage;
