import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react'

import { checkoutCreate } from '@shopify/operations/checkout/checkoutCreate'
import { getCheckoutId } from '@shopify/utils/getCheckoutId'
import { useLayout } from '../Layout/Context'

type CartContextType = {
  addProductToCart: (productId: string) => Promise<void>
}

const CartContext = createContext({} as CartContextType)

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { openCartSidebar } = useLayout()

  const addProductToCart = useCallback(async (productId: string) => {
    const checkoutId = getCheckoutId()

    if (checkoutId) {
      // TODO: add tratative if a user already has a checkoutId
    } else {
      await checkoutCreate(productId)
    }

    // TODO: add item to cart state

    openCartSidebar()
  }, [])

  const providerValue = useMemo(
    () => ({
      addProductToCart
    }),
    [addProductToCart]
  )

  return (
    <CartContext.Provider value={providerValue}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const context = useContext(CartContext)

  return context
}

export { CartContext, CartProvider, useCart }
