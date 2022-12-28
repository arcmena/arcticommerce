import Cookies from 'js-cookie'

import { SHOPIFY_CHECKOUT_ID_COOKIE } from '@shopify/constants'

const getCheckoutId = () => {
  const checkoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE)

  return checkoutId
}

export { getCheckoutId }
