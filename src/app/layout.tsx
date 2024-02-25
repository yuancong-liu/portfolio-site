import { Analytics } from '@vercel/analytics/react';
import '~/styles/globals.scss';

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <div className="overall-background-grid" />
        <div className="overall-background-gradient" />
        {children}
      </body>
      <Analytics />
    </html>
  );
};

export default RootLayout;
