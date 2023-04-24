import cn from 'classnames'
import { ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { SIDEBAR_ORIENTATION } from './types'

interface SidebarProps {
  isOpen: boolean
  closeSidebar: () => void
  orientation?: string
  children: ReactNode
}

const Sidebar = (props: SidebarProps) => {
  const {
    isOpen,
    closeSidebar,
    orientation = SIDEBAR_ORIENTATION.LEFT,
    children
  } = props

  const isOrientationLeft = orientation === SIDEBAR_ORIENTATION.LEFT

  const sidebarTranlationClasses = isOrientationLeft
    ? isOpen
      ? 'translate-x-0 relative shadow-xl shadow-gray-500'
      : '-translate-x-full shadow'
    : isOpen
    ? '-translate-x-full relative shadow-xl shadow-gray-500'
    : 'translate-x-0 shadow'

  const closeButtonPosition = isOrientationLeft
    ? { left: 'calc(80% + 80px)' }
    : { right: 'calc(80% + 80px)' }

  return (
    <div
      className={cn(
        'block bg-white min-h-screen w-4/5 z-50 max-w-[400px] top-0 transform ease-in-out duration-300 fixed',
        !isOrientationLeft && 'left-full',
        sidebarTranlationClasses
      )}
    >
      <div className="bg-white">{children}</div>

      <button
        onClick={closeSidebar}
        style={closeButtonPosition}
        className={cn(
          'fixed z-50 top-3 cursor-pointer md:top-2 md:mr-2',
          isOpen ? 'inline' : 'hidden'
        )}
      >
        <XMarkIcon className="h-8 text-white" />
      </button>
    </div>
  )
}

export default Sidebar
