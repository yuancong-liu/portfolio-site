import { NextPage } from 'next';

import { NavBarCommon } from '~/components/common/navBarCommon';

import styles from './index.module.scss';

const NianNianPage: NextPage = () => (
  <>
    <NavBarCommon />
    <main className={styles['page-wrapper']}>
      <div className={styles['content-wrapper']}>
        {/* Title */}
        <div className={styles['title-area']}>
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
  </>
);

export default NianNianPage;
