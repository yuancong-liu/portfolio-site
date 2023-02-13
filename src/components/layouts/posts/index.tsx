import { FC } from 'react';

export type Props = {
  children?: React.ReactNode;
}

export const LayoutPost: FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
}