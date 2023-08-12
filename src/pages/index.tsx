import type { NextPage } from 'next';
import Head from 'next/head';
import { LayoutTop } from '~/components/layouts/top';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TopIconsPc } from '~/components/pages/top/topIconsPc';
import { useDeviceDetect } from '~/hooks';
import { TopIconsSp } from '~/components/pages/top/topIconsSp';

const Home: NextPage = () => {
  const isPc = useDeviceDetect();
  if (typeof isPc === 'undefined') return (<></>);

  return (
    <LayoutTop>
      <Head>
        <title>ㅇㅇㅊ</title>
      </Head>
      <main>
        {isPc ? <TopIconsPc /> : <TopIconsSp />}
      </main>
    </LayoutTop>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
