import { Analytics } from '@vercel/analytics/react';
import { Metadata, Viewport } from 'next';
import '~/styles/globals.scss';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ''),
};

export const viewport: Viewport = {
  themeColor: '#132043',
};

const RootLayout = ({ children }: Props) => (
  <html lang="en">
    <body>
      <div className="overall-background" />
      {children}
    </body>
    <Analytics />
  </html>
);

export default RootLayout;
