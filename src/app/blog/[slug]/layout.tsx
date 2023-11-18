import { NavBar } from "~/components/common/navBar";

type Props = {
  children: React.ReactNode;
};

const PostLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default PostLayout;
