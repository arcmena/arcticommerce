import Sidebar from '@components/Elements/Sidebar'
import { SIDEBAR_ORIENTATION } from '@components/Elements/Sidebar/Sidebar'
import { useLayout } from '../Layout/Context'

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

  return (
    <Sidebar
      orientation={SIDEBAR_ORIENTATION.RIGHT}
      isOpen={isCartSidebarOpen}
      closeSidebar={closeCartSidebar}
    >
      <div className="px-4 py-8">
        <div className="pb-8 text-center font-light">
          <h2 className="text-[22px]">Your Cart</h2>
        </div>

        <NoItemsMessage />
      </div>
    </Sidebar>
  )
}

export default CartSidebar
