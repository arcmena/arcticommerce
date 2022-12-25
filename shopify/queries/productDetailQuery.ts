import { gql } from 'graphql-request'

const productDetailQuery = gql`
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            sku
            title
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options(first: 10) {
        id
        name
        values
      }
    }
  }
`

export { productDetailQuery }