// 'use client';
// import type { Metadata } from 'next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IconsPc } from '~/components/pages/top/IconsPc';
import { IconsSp } from '~/components/pages/top/IconsSp';
import { useDeviceDetect } from '~/hooks';
import { NavBar } from '~/components/common/NavBar';

export const Home = () => {
  const { isPc } = useDeviceDetect();
  if (!window) return <></>;

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
