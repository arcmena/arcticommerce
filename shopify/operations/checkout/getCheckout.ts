import { shopifyClient } from '@shopify/client'
import { Checkout } from '@shopify/schema'
import getCheckoutQuery from '@shopify/queries/getCheckoutQuery'
import { getCheckoutId } from '@shopify/utils/getCheckoutId'

export interface GetCheckoutResult {
  node?: Checkout
}

const getCheckout = async () => {
  const checkoutId = getCheckoutId()

  if (checkoutId) {
    return await shopifyClient.request<GetCheckoutResult>(getCheckoutQuery, {
      checkoutId
    })
  }

  return undefined
}

export { getCheckout }
