'use client';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavBar } from '~/components/common/NavBar';
import { IconsPc } from '~/components/pages/top/IconsPc';
import { IconsSp } from '~/components/pages/top/IconsSp';
import { useDeviceDetect } from '~/hooks';

export const Home = () => {
  const { isPc } = useDeviceDetect();
  if (window === undefined) return null;

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
