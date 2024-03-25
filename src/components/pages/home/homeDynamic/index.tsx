'use client';

// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavBarHome } from '~/components/pages/home/navBarHome';
import { useDeviceDetect } from '~/hooks';

import { IconsPc } from '../IconsPc';
import { IconsSp } from '../IconsSp';

export const HomeDynamic = () => {
  const { isPc } = useDeviceDetect();

  const content = () => {
    if (typeof isPc === 'undefined') return null;
    if (isPc) return <IconsPc />;
    return <IconsSp />;
  };

  return (
    <>
      <NavBarHome />
      <main>{content()}</main>
    </>
  );
};

// export const getStaticProps = async ({ locale }: { locale: string }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common'])),
//   },
// });
