type Props = {
  children: React.ReactNode;
};

export const PostLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default PostLayout;
