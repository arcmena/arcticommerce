import { shopifyClient } from '@shopify/client'
import { getCheckoutId } from '@shopify/utils/getCheckoutId'
import { Checkout } from '@shopify/schema'
import { checkoutLineItemsUpdateMutation } from '@shopify/mutations/checkoutLineItemsUpdateMutation'

export interface CheckoutLineItemAddResult {
  checkoutLineItemsUpdate: {
    checkout?: Checkout
    checkoutUserErrors: any[]
  }
}

export interface UpdateCheckoutInput {
  id?: string
  variantId?: string
  quantity?: number
}

const checkoutLineItemsUpdate = async (lineItem: UpdateCheckoutInput) => {
  const checkoutId = getCheckoutId()

  const { checkoutLineItemsUpdate } =
    await shopifyClient.request<CheckoutLineItemAddResult>(
      checkoutLineItemsUpdateMutation,
      {
        checkoutId,
        lineItems: [
          {
            ...lineItem
          }
        ]
      }
    )

  return checkoutLineItemsUpdate
}

export { checkoutLineItemsUpdate }
