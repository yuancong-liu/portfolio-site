import { Metadata } from 'next';

import { HomeDynamic } from '../../components/pages/home/homeDynamic';

export const metadata: Metadata = {
  title: 'YC SPACE',
  description: 'ㅇㅇㅊ',
};

export default function HomePage() {
  return <HomeDynamic />;
}
