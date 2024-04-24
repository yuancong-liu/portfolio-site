import { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { Metadata, Viewport } from 'next';

import { CommonBg } from '~/components/common/commonBg';
import '~/styles/globals.scss';


type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'),
};

export const viewport: Viewport = {
  themeColor: '#132043',
};

const RootLayout = ({ children }: Props) => (
  <html lang="en">
    <body>
      {children}
      <CommonBg />
    </body>
    <Analytics />
  </html>
);

export default RootLayout;
