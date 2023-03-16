import { shopifyClient } from '@shopify/client'
import { getCheckoutId } from '@shopify/utils/getCheckoutId'
import { Checkout } from '@shopify/schema'
import { checkoutLineItemsRemoveMutation } from '@shopify/mutations/checkoutLineItemsRemoveMutation'

export interface CheckoutLineItemRemoveResult {
  checkoutLineItemsRemove: {
    checkout?: Checkout
    checkoutUserErrors: any[]
  }
}

export interface RemoveCheckoutItemsInput {
  productId?: string
}

const checkoutLineItemsRemove = async ({
  productId
}: RemoveCheckoutItemsInput) => {
  const checkoutId = getCheckoutId()

  const { checkoutLineItemsRemove } =
    await shopifyClient.request<CheckoutLineItemRemoveResult>(
      checkoutLineItemsRemoveMutation,
      {
        checkoutId,
        lineItemIds: [productId]
      }
    )

  return checkoutLineItemsRemove
}

export { checkoutLineItemsRemove }
