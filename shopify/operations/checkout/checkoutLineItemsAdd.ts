import { shopifyClient } from '@shopify/client'
import { getCheckoutId } from '@shopify/utils/getCheckoutId'
import { checkoutLineItemAddMutation } from '@shopify/mutations/checkoutLineItemAddMutation'
import { Checkout } from '@shopify/schema'

export interface CheckoutLineItemAddResult {
  checkoutLineItemsAdd: {
    checkout?: Checkout
    checkoutUserErrors: any[]
  }
}

const checkoutLineItemAdd = async (variantId: string) => {
  const checkoutId = getCheckoutId()

  const { checkoutLineItemsAdd } =
    await shopifyClient.request<CheckoutLineItemAddResult>(
      checkoutLineItemAddMutation,
      {
        checkoutId,
        lineItems: [
          {
            quantity: 1,
            variantId
          }
        ]
      }
    )

  return checkoutLineItemsAdd
}

export { checkoutLineItemAdd }
