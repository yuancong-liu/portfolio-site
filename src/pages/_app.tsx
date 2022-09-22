import '~/styles/globals.css'
import fontsLoader from "~/interfaces/fontsLoader";
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    fontsLoader(document)
  }, [])

  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
