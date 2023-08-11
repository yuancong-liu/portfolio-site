import type { NextPage } from 'next';
import Head from 'next/head';
import { LayoutTop } from '~/components/layouts/top';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: NextPage = () => {
  return (
    <LayoutTop>
      <Head>
        <title>ㅇㅇㅊ</title>
      </Head>
      <main>工事中</main>
    </LayoutTop>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
