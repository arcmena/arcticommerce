import Sidebar from '@components/Elements/Sidebar'
import { SIDEBAR_ORIENTATION } from '@components/Elements/Sidebar/Sidebar'
import { useLayout } from '../Layout/Context'

const CartSidebar = () => {
  const { isCartSidebarOpen, closeCartSidebar } = useLayout()

  return (
    <Sidebar
      orientation={SIDEBAR_ORIENTATION.RIGHT}
      isOpen={isCartSidebarOpen}
      closeSidebar={closeCartSidebar}
    >
      <div>cart items</div>
    </Sidebar>
  )
}

export default CartSidebar
