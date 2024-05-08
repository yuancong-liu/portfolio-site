import { ReactNode } from 'react';

import { Footer } from '~/components/common/footer';
import { NavBar } from '~/components/common/navBar';
import { ThemeRadio } from '~/components/common/themeRadio';

import styles from './layout.module.scss';

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
