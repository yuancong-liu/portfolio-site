import { ReactNode } from 'react';

import { Footer } from '~/components/common/footer';
import { NavBarCommon } from '~/components/common/navBarCommon';

import styles from './layout.module.scss';

type Props = {
  children: ReactNode;
};

const BlogLayout = ({ children }: Props) => (
  <div className={styles['page-wrapper']}>
    <NavBarCommon pageDiv="post" />
    {children}
    <Footer />
  </div>
);

export default BlogLayout;
