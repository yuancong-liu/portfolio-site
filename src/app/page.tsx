import { Metadata } from 'next';
import { Home } from './home';

export const metadata: Metadata = {
  title: 'YC SPACE',
  description: 'ㅇㅇㅊ',
};

export default function HomePage() {
  return <Home />;
}
