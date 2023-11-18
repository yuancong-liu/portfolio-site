import { NavBarCommon } from "~/components/common/navBarCommon";

type Props = {
  children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
  return (
    <>
      <NavBarCommon />
      {children}
    </>
  );
};
