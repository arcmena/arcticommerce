import Sidebar from '@components/Elements/Sidebar'
import { useLayout } from '../Layout/Context'
import Link from 'next/link'

const MenuSidebar = () => {
  const { isMenuSidebarOpen, closeMenuSidebar } = useLayout()

  return (
    <Sidebar isOpen={isMenuSidebarOpen} closeSidebar={closeMenuSidebar}>
      <div>
        <div className="flex">
          <a className="py-8 px-4 text-black text-[13px] font-light tracking-widest">
            SEARCH
          </a>
        </div>

        <div>
          <ul>
            <li className="flex">
              <Link
                href="/"
                className="py-5 px-4 text-black text-[13px] font-light tracking-widest border-y-[1px] border-gray-200 w-full"
              >
                HOME
              </Link>
            </li>
            <li className="flex">
              <a className="py-5 px-4 text-black text-[13px] font-light tracking-widest border-b-[1px] border-gray-200 w-full">
                SHOP
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Sidebar>
  )
}

export default MenuSidebar
