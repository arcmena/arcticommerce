import { gql } from 'graphql-request'

import { checkoutDetailsFragment } from '../queries/getCheckoutQuery'

const checkoutCreateMutation = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
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

export { checkoutCreateMutation }
