import { ReactNode } from 'react'
import Header from '../Header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white w-full h-full">
      <Header />
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  )
}

export default Layout
