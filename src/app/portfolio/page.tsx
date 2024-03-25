import classNames from 'classnames';
import type { Metadata, NextPage } from 'next';

import { FilmsContent } from '~/components/pages/portfolio/filmsContent';
import { Section } from '~/components/pages/portfolio/section';

import styles from './index.module.scss';

export const metadata: Metadata = {
  alternates: {
    canonical: '/portfolio',
  },
};

/**
 * Portfolio page
 */
const PortfolioPage: NextPage = () => (
  <main className={classNames(styles['content-wrapper'], 'portfolio-wrapper')}>
    {/* design works */}
    <section className={styles.block}>
      <Section title="DESIGNS">
        <h1>#1</h1>
      </Section>
    </section>

    {/* films */}
    <section className={styles.block}>
      <Section title="FILMS">
        <FilmsContent />
      </Section>
    </section>
  </main>
);

export default PortfolioPage;
