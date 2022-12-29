import cn from 'classnames'
import { ReactNode, useEffect } from 'react'

import Header from '../Header'
import MenuSidebar from '../MenuSidebar'
import CartSidebar from '../Cart/Sidebar/Sidebar'
import { useLayout } from './Context'
import { useRouter } from 'next/router'

const Backdrop = () => {
  const { isMenuSidebarOpen, isCartSidebarOpen } = useLayout()

  const isSidebarOpen = isMenuSidebarOpen || isCartSidebarOpen

  return (
    <div
      className={cn(
        'bg-black h-full w-full top-0 left-0 fixed transition-opacity ease-in-out duration-300',
        isSidebarOpen ? 'opacity-30 z-40' : 'opacity-0 -z-50'
      )}
    />
  )
}

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const {
    isMenuSidebarOpen,
    isCartSidebarOpen,
    closeMenuSidebar,
    closeCartSidebar
  } = useLayout()
  const router = useRouter()

  const isSidebarOpen = isMenuSidebarOpen || isCartSidebarOpen

  useEffect(() => {
    const handleRouteChange = (_url: string) => {
      closeMenuSidebar()
      closeCartSidebar()
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <>
      <MenuSidebar />
      <CartSidebar />
      <Backdrop />
      <div
        className={cn(
          'bg-white w-full h-full overflow-hidden',
          isSidebarOpen ? 'top-0 fixed' : 'top-[initial] relative'
        )}
      >
        <Header />
        <main>{children}</main>
        <footer>footer</footer>
      </div>
    </>
  )
}

export default Layout
