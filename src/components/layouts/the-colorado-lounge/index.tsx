export type Props = {
  children?: React.ReactNode;
};

export const LayoutBlog: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
