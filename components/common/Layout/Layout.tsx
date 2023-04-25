import cn from 'classnames'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

import Header from '../Header'
import Footer from '../Footer'
import MenuSidebar from '../MenuSidebar'
import CartSidebar from '../Cart/CartSidebar/CartSidebar'
import { useLayout } from './Context'
import Ribbon from '@components/Elements/Ribbon/Ribbon'

const Backdrop = ({ onBackdropClick }: { onBackdropClick: () => void }) => {
  const { isMenuSidebarOpen, isCartSidebarOpen } = useLayout()

  const isSidebarOpen = isMenuSidebarOpen || isCartSidebarOpen

  return (
    <div
      onClick={onBackdropClick}
      className={cn(
        'bg-black h-full w-full top-0 left-0 fixed transition-opacity ease-in-out duration-300 cursor-pointer',
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

  const resetSidebars = () => {
    closeMenuSidebar()
    closeCartSidebar()
  }

  useEffect(() => {
    router.events.on('routeChangeStart', resetSidebars)

    return () => {
      router.events.off('routeChangeStart', resetSidebars)
    }
  }, [])

  return (
    <>
      <MenuSidebar />
      <CartSidebar />
      <Backdrop onBackdropClick={resetSidebars} />
      <div
        className={cn(
          'bg-white w-full h-full overflow-hidden',
          isSidebarOpen ? 'top-0 fixed' : 'top-[initial] relative'
        )}
      >
        {router.pathname === '/' ? <Ribbon /> : null}
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
