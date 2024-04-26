'use client';

// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavBar } from '~/components/common/navBar';
import { useDeviceDetect } from '~/hooks';

import { IconsPc } from '../IconsPc';
import { IconsSp } from '../IconsSp';

import styles from './index.module.scss';

export const HomeDynamic = () => {
  const { isPc } = useDeviceDetect();

  const content = () => {
    if (typeof isPc === 'undefined') return null;
    if (isPc) return <IconsPc />;
    return <IconsSp />;
  };

  return (
    <>
      <NavBar />
      <main className={styles.main}>{content()}</main>
    </>
  );
};

// export const getStaticProps = async ({ locale }: { locale: string }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common'])),
//   },
// });
