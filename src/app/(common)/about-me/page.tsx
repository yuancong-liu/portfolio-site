import { CardsView } from '~/components/pages/about-me/cardsView';

import styles from './index.module.scss';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

/**
 * AboutMePage
 */
const AboutMePage = () => {
  return (
    <main>
      {/* <h1 className={styles['back-button']}>hello</h1> */}
      <div className={styles['content-wrapper']}>
        {/* profile */}
        {/* <section className={styles['block']}></section> */}

        {/* experiences */}
        <section className={styles['block']}>
          <CardsView />
        </section>
      </div>
    </main>
  );
};

// export const getStaticProps = async ({ locale }: { locale: string }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common'])),
//   },
// });

export default AboutMePage;
