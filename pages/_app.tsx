import type { AppProps } from 'next/app'

import { LayoutProvider } from '@components/common/Layout/Context'
import { CartProvider } from '@components/common/Cart/Context'
import Layout from '@components/common/Layout'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </LayoutProvider>
  )
}
