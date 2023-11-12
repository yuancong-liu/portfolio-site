import { NextPageContext } from 'next';
import FourOhFourPage from '~/components/pages/404';

/** カスタマイズエラーページ */
const ErrorPage = () => {
  return <FourOhFourPage />;
};

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
