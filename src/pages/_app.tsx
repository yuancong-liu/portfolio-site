import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import { AnimatePresence } from 'framer-motion';
import 'highlight.js/styles/default.css';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default appWithTranslation(MyApp);
