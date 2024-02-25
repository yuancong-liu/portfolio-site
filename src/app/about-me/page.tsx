import { CardsView } from '~/components/pages/about-me/cardsView';
import { Introduction } from '~/components/pages/about-me/introduction';

import styles from './index.module.scss';

/**
 * AboutMePage
 */
const AboutMePage = () => {
  return (
    <main className={styles['content-wrapper']}>
      {/* introduction */}
      <section className={styles['block']}>
        <Introduction />
      </section>

      {/* experiences */}
      <section className={styles['block']}>
        <CardsView />
      </section>
    </main>
  );
};

export default AboutMePage;
