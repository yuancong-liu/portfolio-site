import { Analytics } from '@vercel/analytics/react';
import { Viewport } from 'next';
import '~/styles/globals.scss';

type Props = {
  children: React.ReactNode;
};

export const viewport: Viewport = {
  themeColor: '#132043',
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <div className="overall-background" />
        {children}
      </body>
      <Analytics />
    </html>
  );
};

export default RootLayout;
