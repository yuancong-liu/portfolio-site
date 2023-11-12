import type { NextPage } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LayoutTop } from '~/components/layouts/top';
import { TopLinks } from '~/components/pages/top/topLinks';
import { TopWelcome } from '~/components/pages/top/topWelcome';
import styles from './index.module.scss';

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

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Home
