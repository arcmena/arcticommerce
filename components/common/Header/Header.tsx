import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

import { useLayout } from '../Layout/Context'
import { useCart } from '../Cart/Context'

const LOGO_PATH = '/logo.webp'

const Header = () => {
  const { openMenuSidebar, openCartSidebar } = useLayout()
  const { cartData } = useCart()

  const cartItemsCount = cartData?.node?.lineItems.edges.length

  return (
    <header className="p-4 md:py-8 md:px-12 border-b-2 border-gray-100">
      <div className="flex justify-between items-center">
        <div style={{ flex: '1 0 0' }} className="flex">
          <button className="lg:hidden" onClick={openMenuSidebar}>
            <Bars3Icon className="h-8 text-black" />
          </button>

          <a className="hidden lg:inline md:p-4 text-black text-[13px] font-light tracking-widest">
            HOME
          </a>

          <a className="hidden lg:flex md:p-4 text-black text-[13px] font-light tracking-widest items-center">
            SHOP <ChevronDownIcon className="w-3 ml-1 text-black" />
          </a>

          <a className="hidden lg:inline md:p-4 text-black text-[13px] font-light tracking-widest">
            ABOUT
          </a>

          <a className="hidden lg:inline md:p-4 text-black text-[13px] font-light tracking-widest">
            JOURNAL
          </a>
        </div>

        <div className="mx-auto">
          <Image src={LOGO_PATH} alt="Logo" width={112} height={20} />
        </div>

        <div className="flex justify-end" style={{ flex: '1 0 0' }}>
          <a className="hidden md:inline md:p-4 text-black text-[13px] font-light tracking-widest">
            SEARCH
          </a>

          <a
            className="md:p-4 text-black text-[13px] font-light tracking-widest"
            onClick={openCartSidebar}
          >
            CART {cartItemsCount && `(${cartItemsCount})`}
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
