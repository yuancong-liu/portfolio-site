import type { NextPage } from 'next';

import { FilmsContent } from '~/components/pages/portfolio/filmsContent';
import { Section } from '~/components/pages/portfolio/section';

import styles from './index.module.scss';

/**
 * Portfolio page
 */
const PortfolioPage: NextPage = () => {
  return (
    <main className={styles['content-wrapper']}>
      {/* design works */}
      <section className={styles['block']}>
        <Section title="DESIGNS">
          <h1>#1</h1>
        </Section>
      </section>

      {/* films */}
      <section className={styles['block']}>
        <Section title="FILMS">
          <FilmsContent />
        </Section>
      </section>
    </main>
  );
};

export default PortfolioPage;
