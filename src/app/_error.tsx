import { NextPageContext } from 'next';

import { FourOhFourPage } from '~/components/pages/404';
import '~/styles/globals.scss';

/** カスタマイズエラーページ */
const ErrorPage = () => {
  return (
    <html>
      <body>
        <FourOhFourPage />
      </body>
    </html>
  );
};

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
