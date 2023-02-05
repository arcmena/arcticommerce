import { gql } from 'graphql-request'

import { checkoutDetailsFragment } from '@shopify/queries/getCheckoutQuery'

const checkoutLineItemsRemoveMutation = gql`
  mutation checkoutLineItemAdd(
    $checkoutId: ID!
    $lineItemIds: [ID!]!
  ) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
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

export { checkoutLineItemsRemoveMutation }
