import { ReactNode } from 'react';

import { Footer } from '~/components/common/footer';
import { NavBar } from '~/components/common/navBar';

import styles from './layout.module.scss';

type Props = {
  children: ReactNode;
};

const BlogLayout = ({ children }: Props) => (
  <div className={styles['page-wrapper']}>
    <NavBar />
    {children}
    <Footer />
  </div>
);

export default BlogLayout;
