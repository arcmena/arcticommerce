import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
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
import {
  checkoutLineItemsUpdate,
  UpdateCheckoutInput
} from '@shopify/operations/checkout/checkoutLineItemsUpdate'
import { checkoutLineItemsRemove } from '@shopify/operations/checkout/checkoutLineItemsRemove'
import { Checkout } from '@shopify/schema'

type CartContextType = {
  isCartLoading: boolean
  isCartValidating: boolean
  cartData?: GetCheckoutResult
  cartError: any
  mutateCart: KeyedMutator<GetCheckoutResult | undefined>
  addProductToCart: (productId: string) => Promise<void>
  updateCartProduct: (product: UpdateCheckoutInput) => Promise<void>
  removeCartProduct: (productId: string) => Promise<void>
  isCartEmpty: boolean
}

const CartContext = createContext({} as CartContextType)

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    isLoading: isCartQueryLoading,
    isValidating: isCartValidating,
    mutate: mutateCart,
    data: cartData,
    error: cartError
  } = useSWR('cart', getCheckout, {
    revalidateOnFocus: false
  })

  const [isCartLoading, setIsCartLoading] = useState(false)

  const isCartEmpty = useMemo(() => {
    if (cartData?.node) {
      if (cartData.node.lineItems.edges.length !== 0) {
        return false
      }
    }

    return true
  }, [cartData])

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

  const updateCartProduct = useCallback(
    async (product: UpdateCheckoutInput) => {
      setIsCartLoading(true)

      const checkoutUpdated = await checkoutLineItemsUpdate(product)

      if (checkoutUpdated.checkout) {
        mutateCart({ node: checkoutUpdated.checkout }, { revalidate: false })
      }

      setIsCartLoading(false)
    },
    [mutateCart]
  )

  const removeCartProduct = useCallback(
    async (productId: string) => {
      setIsCartLoading(true)

      const checkoutUpdated = await checkoutLineItemsRemove({ productId })

      if (checkoutUpdated.checkout) {
        mutateCart({ node: checkoutUpdated.checkout }, { revalidate: false })
      }

      setIsCartLoading(false)
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
      addProductToCart,
      updateCartProduct,
      removeCartProduct,
      isCartEmpty
    }),
    [
      addProductToCart,
      updateCartProduct,
      removeCartProduct,
      cartData,
      cartError,
      isCartLoading,
      isCartValidating,
      mutateCart,
      isCartEmpty
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
