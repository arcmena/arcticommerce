import { gql } from 'graphql-request'

export const checkoutDetailsFragment = gql`
  fragment checkoutDetails on Checkout {
    id
    webUrl
    subtotalPrice {
      amount
      currencyCode
    }
    totalPrice {
      amount
      currencyCode
    }
    completedAt
    createdAt
    lineItems(first: 250) {
      edges {
        node {
          id
          title
          quantity
          variant {
            id
            sku
            title
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            product {
              handle
            }
          }
        }
      }
    }
  }
`

const getCheckoutQuery = gql`
  query getCheckout($checkoutId: ID!) {
    node(id: $checkoutId) {
      ...checkoutDetails
    }
  }
  ${checkoutDetailsFragment}
`
export default getCheckoutQuery
