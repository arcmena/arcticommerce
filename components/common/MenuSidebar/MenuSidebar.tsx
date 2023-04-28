import Sidebar from '@components/Elements/Sidebar'
import { useLayout } from '../Layout/Context'
import Link from 'next/link'
import { useRef, useState } from 'react'
import cn from 'classnames'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

const MenuSidebar = () => {
  const { isMenuSidebarOpen, closeMenuSidebar } = useLayout()

  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLUListElement>(null)

  const sidebarTranlationClasses = isOpen
    ? '-translate-x-full shadow'
    : 'translate-x-0'

  return (
    <Sidebar isOpen={isMenuSidebarOpen} closeSidebar={closeMenuSidebar}>
      <div className="flex">
        <a className="py-8 px-4 text-black text-[13px] font-normal tracking-widest">
          SEARCH
        </a>
      </div>

      <ul
        className="overflow-hidden relative transform ease-in-out duration-300"
        style={{ height: isOpen ? ref.current?.clientHeight : 'auto' }}
      >
        <li className="flex">
          <Link
            href="/"
            className="py-5 px-4 text-black text-[13px] font-normal tracking-widest border-y-[1px] border-gray-200 w-full"
          >
            HOME
          </Link>
        </li>
        <li className="">
          <div className="flex">
            <a
              className="py-5 px-4 text-black text-[13px] font-normal tracking-widest border-b-[1px] border-gray-200 w-full flex items-center justify-between"
              onClick={() => setIsOpen(prev => !prev)}
            >
              SHOP
              <ChevronRightIcon className="h-4 w-4" />
            </a>
          </div>
          <div
            className={cn(
              'block absolute min-w-[150px] bg-white overflow-hidden left-full w-full top-0 bottom-0 z-40 transform ease-in-out duration-300',
              sidebarTranlationClasses,
              {
                ['hidden']: !isMenuSidebarOpen
              }
            )}
          >
            <ul ref={ref}>
              <li className="flex">
                <a
                  className="py-5 px-4 text-black text-[13px] font-normal tracking-widest border-b-[1px] border-gray-200 w-full relative flex items-center justify-center"
                  onClick={() => setIsOpen(prev => !prev)}
                >
                  BACK
                  <ChevronLeftIcon className="h-4 w-4 absolute left-3" />
                </a>
              </li>
              <li className="flex">
                <a className="py-5 px-4 text-black text-[13px] font-normal tracking-widest border-b-[1px] border-gray-200 w-full">
                  SHOP
                </a>
              </li>
              <li className="flex">
                <a className="py-5 px-4 pl-[35px] text-black text-[13px] font-normal tracking-widest border-b-[1px] border-gray-200 w-full">
                  SHOP EVERYTHING
                </a>
              </li>
              <li className="flex">
                <a className="py-5 px-4 pl-[35px] text-black text-[13px] font-normal tracking-widest border-b-[1px] border-gray-200 w-full">
                  WINTER COLLECTION
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </Sidebar>
  )
}

export default MenuSidebar
