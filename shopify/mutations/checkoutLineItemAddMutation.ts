import { gql } from 'graphql-request'

import { checkoutDetailsFragment } from '@shopify/queries/getCheckoutQuery'

const checkoutLineItemAddMutation = gql`
  mutation checkoutLineItemAdd(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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

export { checkoutLineItemAddMutation }
