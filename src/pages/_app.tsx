import '~/styles/globals.css'
import fontsLoader from "~/interface/fontsLoader";
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    fontsLoader(document)
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
