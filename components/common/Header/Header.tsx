import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

import { useLayout } from '../Layout/Context'
import { useCart } from '../Cart/Context'

const LOGO_PATH = '/logo.webp'

const Header = () => {
  const { openMenuSidebar, openCartSidebar } = useLayout()
  const { cartData, isCartEmpty } = useCart()

  const cartItemsCount = cartData?.node?.lineItems.edges.reduce((acc, cur) => {
    const currentQuantity = cur.node.quantity

    return acc + currentQuantity
  }, 0)

  return (
    <header className="p-4 md:py-8 md:px-12 border-b-2 border-gray-100">
      <div className="flex justify-between items-center">
        <div style={{ flex: '1 0 0' }} className="flex">
          <button className="lg:hidden" onClick={openMenuSidebar}>
            <Bars3Icon className="h-8 text-black" />
          </button>

          <Link
            href="/"
            className="hidden lg:inline md:p-4 text-black text-[13px] md:text-[14px] md:font-normal font-light tracking-widest"
          >
            HOME
          </Link>

          <a className="hidden lg:flex md:p-4 text-black text-[13px] md:text-[14px] md:font-normal font-light tracking-widest items-center">
            SHOP <ChevronDownIcon className="w-3 ml-1 text-black" />
          </a>
        </div>

        <div className="mx-auto">
          <Link href="/">
            <Image src={LOGO_PATH} alt="Logo" width={112} height={20} />
          </Link>
        </div>

        <div className="flex justify-end" style={{ flex: '1 0 0' }}>
          <a className="hidden md:inline md:p-4 text-black text-[13px] md:text-[14px] md:font-normal font-light tracking-widest">
            SEARCH
          </a>

          <a
            className="md:p-4 text-black text-[13px] md:text-[14px] md:font-normal font-light tracking-widest cursor-pointer"
            onClick={openCartSidebar}
          >
            CART {!isCartEmpty && `(${cartItemsCount})`}
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
