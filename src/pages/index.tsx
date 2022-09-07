import type { NextPage } from 'next'
import Head from 'next/head'
import styles from './index.module.scss';
import { TopWelcome } from '~/components/pages/top/topWelcome';
import { LayoutTop } from '~/components/layouts/top';
import { TopLinks } from '~/components/pages/top/topLinks';

const Home: NextPage = () => {

  return (
      <LayoutTop>
        <Head>
          <title>YUANCONG</title>
          <meta name="description" content="Hi, I'm YUANCONG" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <main>
          <div className={styles['index-container']}>
            <div className={styles['top']}>
              <TopLinks position="top" />
            </div>
            <div className={styles['welcome-wrapper']}>
              <TopWelcome />
            </div>
            <div className={styles['bottom']}>
              <TopLinks position="bottom" />
            </div>
          </div>
        </main>
      </LayoutTop>
  )
}

export default Home
