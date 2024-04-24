import { ReactNode } from 'react';

import { NavBarCommon } from '~/components/common/navBarCommon';

import styles from './layout.module.scss';

type Props = {
  children: ReactNode;
};

const AboutMeLayout = ({ children }: Props) => (
  <div className={styles['page-wrapper']}>
    <NavBarCommon />
    {children}
  </div>
);

export default AboutMeLayout;
