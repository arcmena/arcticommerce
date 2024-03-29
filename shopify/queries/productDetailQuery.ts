import { gql } from 'graphql-request'

const productDetailQuery = gql`
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
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
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
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
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
      swatchImages: metafield(namespace: "custom", key: "swatch_images") {
        value
      }
    }
  }
`

export { productDetailQuery }
