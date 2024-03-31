import { NextPage } from 'next';

import styles from './index.module.scss';

const NianNianPage: NextPage = () => (
  <main className={styles['page-wrapper']}>
    <div className={styles['content-wrapper']}>
      {/* Title */}
      <div className={styles['title-area']}>
        <p className={styles.description}>
          &quot;It&apos;s a difficult time in her life, and if she can get
          through it, I&apos;m sure she&apos;ll be happy.&quot;
        </p>
        <h1 className={styles.title}>Nian&apos; Nian.</h1>
        <p className={styles.original}>念念</p>
      </div>

      {/* iframe */}
      <div className={styles['iframe-wrapper']}>
        <iframe
          className={styles.iframe}
          src="https://www.youtube.com/embed/QocgLpdHsrw"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  </main>
);

export default NianNianPage;
