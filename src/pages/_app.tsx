import '~/styles/globals.css'
import fontsLoader from "~/interfaces/fontsLoader";
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next';
import { AnimatePresence } from 'framer-motion';
import 'highlight.js/styles/default.css'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    fontsLoader(document)
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default appWithTranslation(MyApp)
