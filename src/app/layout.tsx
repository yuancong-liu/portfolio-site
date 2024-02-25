import { Analytics } from '@vercel/analytics/react';
import '~/styles/globals.scss';

type Props = {
  children: React.ReactNode;
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
