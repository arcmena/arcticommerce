import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'

import Layout from '../components/common/Layout'

import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>{' '}
      <Component {...pageProps} />
    </Layout>
  )
}
