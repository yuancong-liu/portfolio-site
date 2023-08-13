import type { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IconsPc } from '~/components/pages/top/IconsPc';
import { IconsSp } from '~/components/pages/top/IconsSp';
import { useDeviceDetect } from '~/hooks';
import { NavBar } from '~/components/common/NavBar';

const Home: NextPage = () => {
  const isPc = useDeviceDetect();
  if (typeof isPc === 'undefined') return <></>;

  return (
    <>
      <Head>
        <title>ㅇㅇㅊ</title>
      </Head>
      <NavBar />
      <main>{isPc ? <IconsPc /> : <IconsSp />}</main>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
