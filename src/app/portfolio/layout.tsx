import { ReactNode } from 'react';

import { NavBar } from '~/components/common/navBar';
import { ThemeRadio } from '~/components/common/themeRadio';

type Props = {
  children: ReactNode;
};

const AboutMeLayout = ({ children }: Props) => (
  <div>
    <NavBar />
    <ThemeRadio />
    {children}
  </div>
);

export default AboutMeLayout;
