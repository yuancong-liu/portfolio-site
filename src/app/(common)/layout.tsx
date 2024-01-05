import { Analytics } from '@vercel/analytics/react';

import styles from './layout.module.scss';

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={styles['body-wrapper']}>{children}</body>
      <Analytics />
    </html>
  );
};

export default RootLayout;
