import '~/styles/globals.css'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app'
import fontsLoader from "~/interfaces/fontsLoader";
import 'highlight.js/styles/default.css'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    fontsLoader(document)
  }, [])

  return (
    <AnimatePresence mode='wait'>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default appWithTranslation(MyApp)
