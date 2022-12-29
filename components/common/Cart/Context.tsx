import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react'
import useSWR, { KeyedMutator } from 'swr'

import { useLayout } from '@components/common/Layout/Context'

import { checkoutCreate } from '@shopify/operations/checkout/checkoutCreate'
import { getCheckoutId } from '@shopify/utils/getCheckoutId'
import {
  getCheckout,
  GetCheckoutResult
} from '@shopify/operations/checkout/getCheckout'
import { checkoutLineItemAdd } from '@shopify/operations/checkout/checkoutLineItemsAdd'
import { Checkout } from '@shopify/schema'

type CartContextType = {
  isCartLoading: boolean
  isCartValidating: boolean
  cartData?: GetCheckoutResult
  cartError: any
  mutateCart: KeyedMutator<GetCheckoutResult | undefined>
  addProductToCart: (productId: string) => Promise<void>
}

const CartContext = createContext({} as CartContextType)

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    isLoading: isCartLoading,
    isValidating: isCartValidating,
    mutate: mutateCart,
    data: cartData,
    error: cartError
  } = useSWR('cart', getCheckout, {
    revalidateOnFocus: false
  })

  const { openCartSidebar } = useLayout()

  const addProductToCart = useCallback(
    async (productId: string) => {
      let newCartData: Checkout | undefined

      const checkoutId = getCheckoutId()

      if (checkoutId) {
        const checkoutUpdated = await checkoutLineItemAdd(productId)
        newCartData = checkoutUpdated?.checkout
      } else {
        const checkoutCreated = await checkoutCreate(productId)
        newCartData = checkoutCreated.checkout
      }

      mutateCart({ node: newCartData }, { revalidate: false })

      openCartSidebar()
    },
    [mutateCart]
  )

  const providerValue = useMemo(
    () => ({
      isCartLoading,
      isCartValidating,
      cartData,
      cartError,
      mutateCart,
      addProductToCart
    }),
    [
      addProductToCart,
      cartData,
      cartError,
      isCartLoading,
      isCartValidating,
      mutateCart
    ]
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