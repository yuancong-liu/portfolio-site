import { Metadata, NextPage } from 'next';

import { ThemeRadio } from '~/components/common/themeRadio';

import { HomeDynamic } from '../components/pages/home/homeDynamic';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
  ),
  title: "YC's SPACE",
  description:
    "Welcome to YC's SPACE. This is a personal website of Paul YC LIU, a front-end engineer, who is also a fan of design, films and games.",
  alternates: {
    canonical: '',
  },
};

const HomePage: NextPage = () => (
  <>
    <HomeDynamic />
    <ThemeRadio />
  </>
);

export default HomePage;
