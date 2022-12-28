import Cookies from 'js-cookie'

import { shopifyClient } from '@shopify/client'
import { checkoutCreateMutation } from '@shopify/mutations/createCheckoutMutation'
import { Checkout } from '@shopify/schema'
import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE
} from '@shopify/constants'

interface CheckoutCreateResponse {
  checkoutCreate: {
    checkout?: Checkout
    checkoutUserErrors: any[]
  }
}

const checkoutCreate = async (variantId: string) => {
  const { checkoutCreate } =
    await shopifyClient.request<CheckoutCreateResponse>(
      checkoutCreateMutation,
      {
        input: {
          lineItems: [
            {
              quantity: 1,
              variantId
            }
          ]
        }
      }
    )

  const checkout = checkoutCreate?.checkout

  if (checkout) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE
    }

    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkout.id, options)

    if (checkout?.webUrl) {
      Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout.webUrl, options)
    }
  }

  return checkoutCreate
}

export { checkoutCreate }
