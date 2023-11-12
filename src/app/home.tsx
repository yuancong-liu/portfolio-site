'use client';
import dynamic from 'next/dynamic';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavBar } from '~/components/common/NavBar';
import { useDeviceDetect } from '~/hooks';

const IconsPc = dynamic(
  () => import('~/components/pages/top/IconsPc').then((mod) => mod.IconsPc),
  {
    ssr: false,
  },
);

const IconsSp = dynamic(
  () => import('~/components/pages/top/IconsSp').then((mod) => mod.IconsSp),
  {
    ssr: false,
  },
);

export const Home = () => {
  const { isPc } = useDeviceDetect();

  return (
    <>
      <NavBar />
      <main>{isPc ? <IconsPc /> : <IconsSp />}</main>
    </>
  );
};

// export const getStaticProps = async ({ locale }: { locale: string }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common'])),
//   },
// });
