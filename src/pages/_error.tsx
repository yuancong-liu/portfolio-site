import { NextPage, NextPageContext } from "next";
import FourOhFourPage from "~/pages/404";

/** カスタマイズエラーページ */
const ErrorPage: NextPage = () => {
  return <FourOhFourPage />
}

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
}

export default ErrorPage;
