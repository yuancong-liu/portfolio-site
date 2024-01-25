'use client';
import { ComponentProps } from 'react';

import Link from 'next/link';

type Props = Pick<ComponentProps<'a'>, 'href' | 'children'>;

export const PostLink = ({ href = '', children }: Props) => (
  <Link href={href}>{children}</Link>
);
