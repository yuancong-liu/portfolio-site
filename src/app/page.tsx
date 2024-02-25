import { Metadata, NextPage } from 'next';

import { HomeDynamic } from '../components/pages/home/homeDynamic';

export const metadata: Metadata = {
  title: 'YC SPACE',
  description: 'ㅇㅇㅊ',
};

const HomePage: NextPage = () => <HomeDynamic />;

export default HomePage;
