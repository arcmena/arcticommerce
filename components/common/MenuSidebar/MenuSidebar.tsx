import Sidebar from '@components/Elements/Sidebar'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useLayout } from '../Layout/Context'

const MenuSidebar = () => {
  const { isMenuSidebarOpen, closeMenuSidebar } = useLayout()

  return (
    <Sidebar isOpen={isMenuSidebarOpen} closeSidebar={closeMenuSidebar}>
      <div>menu items</div>
    </Sidebar>
  )
}

export default MenuSidebar
