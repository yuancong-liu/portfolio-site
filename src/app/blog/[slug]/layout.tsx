import { NavBar } from "~/components/common/navBar";

type Props = {
  children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

