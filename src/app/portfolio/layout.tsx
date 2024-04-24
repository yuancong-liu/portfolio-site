import { ReactNode } from 'react';

import { NavBarCommon } from '~/components/common/navBarCommon';

type Props = {
  children: ReactNode;
};

const AboutMeLayout = ({ children }: Props) => (
  <div>
    <NavBarCommon />
    {children}
  </div>
);

export default AboutMeLayout;
