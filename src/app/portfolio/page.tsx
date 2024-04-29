import classNames from 'classnames';
import type { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { ImageWithLoading } from '~/components/common/image/imageWithLoading';
import { ScrollingText } from '~/components/common/scrollingText';

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
      <ScrollingText text="PORTFOLIO" />
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
    <div className={classNames(styles['designs-section'], styles.section)}>
      <Link href="/#" className={classNames(styles['design-link'], styles.aas)}>
        <span className={styles.numbering}>#1</span>
        <span className={styles.title}>Redesign of Academic Affair System</span>
      </Link>
      <Link href="/#" className={classNames(styles['design-link'], styles.shp)}>
        <span className={styles.numbering}>#2</span>
        <span className={styles.title}>App for Small Health Problems</span>
      </Link>
      <Link href="/#" className={classNames(styles['design-link'], styles.ksk)}>
        <span className={styles.numbering}>#3</span>
        <span className={styles.title}>Kuseki</span>
      </Link>
      <Link href="/#" className={classNames(styles['design-link'], styles.akb)}>
        <span className={styles.numbering}>#4</span>
        <span className={styles.title}>Redesign of AKB48 Official Website</span>
      </Link>
    </div>
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
