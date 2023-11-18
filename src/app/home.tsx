'use client';
import dynamic from 'next/dynamic';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavBarHome } from '~/components/pages/home/navBarHome';
import { useDeviceDetect } from '~/hooks';

const IconsPc = dynamic(
  () => import('~/components/pages/home/IconsPc').then((mod) => mod.IconsPc),
  {
    ssr: false,
  },
);

const IconsSp = dynamic(
  () => import('~/components/pages/home/IconsSp').then((mod) => mod.IconsSp),
  {
    ssr: false,
  },
);

export const Home = () => {
  const { isPc } = useDeviceDetect();

  return (
    <>
      <NavBarHome />
      <main>{isPc ? <IconsPc /> : <IconsSp />}</main>
    </>
  );
};

// export const getStaticProps = async ({ locale }: { locale: string }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common'])),
//   },
// });
