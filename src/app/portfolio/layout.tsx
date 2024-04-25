import { ReactNode } from 'react';

import { NavBar } from '~/components/common/navBar';

type Props = {
  children: ReactNode;
};

const AboutMeLayout = ({ children }: Props) => (
  <div>
    <NavBar />
    {children}
  </div>
);

export default AboutMeLayout;
