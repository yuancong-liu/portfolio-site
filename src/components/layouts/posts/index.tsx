export type Props = {
  children?: React.ReactNode;
}

export const LayoutPost: React.FC<Props> = ({ children }) => {

  return (
    <div>
      {children}
    </div>
  );
}