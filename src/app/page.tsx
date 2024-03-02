import { Metadata, NextPage } from 'next';

import { HomeDynamic } from '../components/pages/home/homeDynamic';

export const metadata: Metadata = {
  title: "YC's SPACE",
  description:
    "Welcome to YC's SPACE. This is a personal website of Paul YC LIU, a front-end engineer, who is also a fan of design, films and games.",
  alternates: {
    canonical: '',
  },
};

const HomePage: NextPage = () => <HomeDynamic />;

export default HomePage;
