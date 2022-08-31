import type { NextPage } from 'next'
import Head from 'next/head'
import styles from './index.module.scss';
import { TopButtonGroup } from '~/components/common/topButtonGroup';
import { LayoutTop } from '~/components/layouts/top';

const Home: NextPage = () => {

  return (
      <LayoutTop>
        <Head>
          <title>YUANCONG</title>
          <meta name="description" content="Hi, I'm YUANCONG" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className={styles['index-container']}>
            <div className={styles['button-wrapper']}>
              <TopButtonGroup />
            </div>
          </div>
          <div className={styles['index-background']}>
            <div className={styles['blend']} />
          </div>
        </main>
      </LayoutTop>
  )
}

export default Home
