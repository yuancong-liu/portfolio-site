import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Footer } from '~/components/common/footer';
import { NavBar } from '~/components/common/navBar';
import { ThemeRadio } from '~/components/common/themeRadio';

import styles from './layout.module.scss';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
  ),
}

type Props = {
  children: ReactNode;
};

const BlogLayout = ({ children }: Props) => (
  <div className={styles['page-wrapper']}>
    <NavBar />
    <ThemeRadio />
    {children}
    <Footer />
  </div>
);

export default BlogLayout;
