import classNames from 'classnames';
import type { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { ImageWithLoading } from '~/components/common/image/imageWithLoading';
import { PageTitle } from '~/components/pages/portfolio/pageTitle';

import styles from './index.module.scss';

export const metadata: Metadata = {
  alternates: {
    canonical: '/portfolio',
  },
};

const NIAN_NIAN_SRC =
  'https://lh3.googleusercontent.com/pw/AP1GczPKz5S8JFRjn34iMvbzLmfOUWf0TVj8SR8N8KgSLDp1e3XAjxyJVZ_quJmXniculUaDWKVpOQK6cRb6lPFEHIXpmB8BvUnU9tBH1F1PMXAkXSrqcRA=w2400';

/**
 * Portfolio page
 */
const PortfolioPage: NextPage = () => (
  <main className={classNames(styles['content-wrapper'], 'portfolio-wrapper')}>
    <div className={styles['title-image']} />
    <div className={styles['title-wrapper']}>
      <PageTitle />
    </div>
    <h3 className={classNames(styles['section-title'])}>films</h3>
    <div className={classNames(styles['films-section'], styles.section)}>
      <Link
        href="https://youtu.be/QocgLpdHsrw?feature=shared"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.image}
      >
        <span className={styles.link}>WATCH ON YOUTUBE</span>
        <ImageWithLoading
          src={NIAN_NIAN_SRC}
          alt="Thumbnail for documentary Nian' Nian."
          className={styles.thumbnail}
        />
      </Link>
      <Link href="/portfolio/nian-nian" className={styles['film-des']}>
        <h4 className={styles['film-title']}>Nian&apos; Nian</h4>
        <p className={styles['film-catch']}>
          &quot;It&apos;s a difficult time in her life, and if she can get
          through it, I&apos;m sure she&apos;ll be happy.&quot;
        </p>
      </Link>
    </div>

    <h3 className={classNames(styles['section-title'])}>designs</h3>
    <div className={classNames(styles['designs-section'], styles.section)} />
    {/* films */}
    {/* <section className={styles.block}>
      <Section title="FILMS">
        <FilmsContent />
      </Section>
    </section> */}

    {/* design works */}
    {/* <section className={styles.block}>
      <Section title="DESIGNS">
        <h1>#1</h1>
      </Section>
    </section> */}
  </main>
);

export default PortfolioPage;
