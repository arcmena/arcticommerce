import cn from 'classnames'

import Sidebar from '@components/Elements/Sidebar'
import { SIDEBAR_ORIENTATION } from '@components/Elements/Sidebar/Sidebar'
import SidebarProduct from './SidebarProduct'
import SidebarFooter from './SidebarFooter'

import { useLayout } from '../../Layout/Context'
import { useCart } from '../Context'
import { useMemo } from 'react'

const NoItemsMessage = () => (
  <div className="text-center">
    <span className="text-[15px] font-normal leading-snug">
      Your cart is currently empty.
      <br />
      <a className="underline">Click here to continue shopping</a>.
    </span>
  </div>
)

const CartSidebar = () => {
  const { isCartSidebarOpen, closeCartSidebar } = useLayout()
  const { cartData, isCartEmpty } = useCart()

  // TODO: check if it's needed to have a revalidation on the cart on every open

  return (
    <Sidebar
      orientation={SIDEBAR_ORIENTATION.RIGHT}
      isOpen={isCartSidebarOpen}
      closeSidebar={closeCartSidebar}
    >
      <div className="px-4 py-8">
        <div
          className={cn(
            'pb-8 text-center',
            !isCartEmpty && 'border-b-[1px] border-gray-200'
          )}
        >
          <h2 className="text-[22px] text-[#111111]">Your Cart</h2>
        </div>

        {isCartEmpty ? (
          <NoItemsMessage />
        ) : (
          <>
            {cartData?.node?.lineItems.edges.map(({ node: item }) => (
              <SidebarProduct key={item.id} productData={item} />
            ))}

            <SidebarFooter checkout={cartData!.node!} />
          </>
        )}
      </div>
    </Sidebar>
  )
}

export default CartSidebar
