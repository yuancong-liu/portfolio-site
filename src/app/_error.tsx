import { NextPageContext } from 'next';

import { FourOhFourPage } from '~/components/pages/404';
import '~/styles/globals.scss';

/** カスタマイズエラーページ */
const ErrorPage = () => (
  <html lang="en">
    <body>
      <FourOhFourPage />
    </body>
  </html>
);

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
  let statusCode: number;

  if (res) {
    statusCode = res.statusCode;
  } else if (err?.statusCode) {
    statusCode = err.statusCode;
  } else {
    statusCode = 404;
  }

  return { statusCode };
};

export default ErrorPage;
