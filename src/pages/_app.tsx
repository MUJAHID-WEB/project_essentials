import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Providers} from './redux/providers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>

      <Component {...pageProps} />
    </Providers>

  )
  
}
