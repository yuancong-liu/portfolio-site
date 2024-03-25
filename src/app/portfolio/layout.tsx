import { NavBarCommon } from '~/components/common/navBarCommon';

type Props = {
  children: React.ReactNode;
};

const AboutMeLayout = ({ children }: Props) => (
  <div>
    <NavBarCommon />
    {children}
  </div>
);

export default AboutMeLayout;
