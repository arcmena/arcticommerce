import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from 'react'

interface State {
  isMenuSidebarOpen: boolean
  isCartSidebarOpen: boolean
}

type Action =
  | { type: 'OPEN_MENU_SIDEBAR' }
  | { type: 'CLOSE_MENU_SIDEBAR' }
  | { type: 'OPEN_CART_SIDEBAR' }
  | { type: 'CLOSE_CART_SIDEBAR' }

const initialState = {
  isMenuSidebarOpen: false,
  isCartSidebarOpen: false
}

const LayoutContext = createContext<State | any>(initialState)

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN_MENU_SIDEBAR': {
      return {
        ...state,
        isMenuSidebarOpen: true
      }
    }
    case 'CLOSE_MENU_SIDEBAR': {
      return {
        ...state,
        isMenuSidebarOpen: false
      }
    }
    case 'OPEN_CART_SIDEBAR': {
      return {
        ...state,
        isCartSidebarOpen: true
      }
    }
    case 'CLOSE_CART_SIDEBAR': {
      return {
        ...state,
        isCartSidebarOpen: false
      }
    }
  }
}

const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openMenuSidebar = useCallback(() => {
    dispatch({ type: 'OPEN_MENU_SIDEBAR' })
  }, [dispatch])

  const closeMenuSidebar = useCallback(() => {
    dispatch({ type: 'CLOSE_MENU_SIDEBAR' })
  }, [dispatch])

  const openCartSidebar = useCallback(() => {
    dispatch({ type: 'OPEN_CART_SIDEBAR' })
  }, [dispatch])

  const closeCartSidebar = useCallback(() => {
    dispatch({ type: 'CLOSE_CART_SIDEBAR' })
  }, [dispatch])

  const providerValue = useMemo(
    () => ({
      ...state,
      openMenuSidebar,
      closeMenuSidebar,
      openCartSidebar,
      closeCartSidebar
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )

  return (
    <LayoutContext.Provider value={providerValue}>
      {children}
    </LayoutContext.Provider>
  )
}

const useLayout = () => {
  const context = useContext(LayoutContext)

  return context
}

export { LayoutContext, LayoutProvider, useLayout }
