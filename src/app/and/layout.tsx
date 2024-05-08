import { ReactNode } from 'react';

import { NavBar } from '~/components/common/navBar';
import { ThemeRadio } from '~/components/common/themeRadio';

import styles from './layout.module.scss';

type Props = {
  children: ReactNode;
};

const AboutMeLayout = ({ children }: Props) => (
  <div className={styles['page-wrapper']}>
    <NavBar />
    <ThemeRadio />
    {children}
  </div>
);

export default AboutMeLayout;
