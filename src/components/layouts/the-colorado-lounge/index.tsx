import { FC } from 'react';

export type Props = {
  children?: React.ReactNode;
}

export const LayoutBlog: FC<Props> = ({ children }) => {

  return (
    <div>
      {children}
    </div>
  );
}