'use client';

// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavBarCommon } from '~/components/common/navBarCommon';
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
      <NavBarCommon />
      <main>{content()}</main>
    </>
  );
};

// export const getStaticProps = async ({ locale }: { locale: string }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common'])),
//   },
// });
