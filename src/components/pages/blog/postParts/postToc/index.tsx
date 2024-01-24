import { ComponentProps } from 'react';

type Props = ComponentProps<'nav'>;

export const PostToc = (props: Props) => {
  return <nav {...props} />;
};
