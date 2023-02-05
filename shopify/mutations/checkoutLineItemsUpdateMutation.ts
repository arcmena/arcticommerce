import { gql } from 'graphql-request'

import { checkoutDetailsFragment } from '@shopify/queries/getCheckoutQuery'

const checkoutLineItemsUpdateMutation = gql`
  mutation checkoutLineItemAdd(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkoutDetails
      }
    }
  }
  ${checkoutDetailsFragment}
`

export { checkoutLineItemsUpdateMutation }
