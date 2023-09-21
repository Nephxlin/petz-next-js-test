import { Inter } from '@next/font/google'
import type { AppProps } from 'next/app'
import { LogoProvider } from '../src/_UI/context/LogoContext/logoProvider'
import GlobalStyle from '../src/_UI/styles/GlobalStyles'

const inter = Inter({ subsets: ['latin'], preload: true })

export default function App({ Component, pageProps }: AppProps) {
  console.log(inter)
  return (
    <LogoProvider>
      <GlobalStyle
        fontFamily={inter.style.fontFamily}
      />
      <Component {...pageProps} className={inter.className} />
    </LogoProvider>
  )
}
