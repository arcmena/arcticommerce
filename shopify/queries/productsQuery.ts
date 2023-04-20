import { gql } from 'graphql-request'

const productsQuery = gql`
  {
    products(first: 5) {
      edges {
        node {
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
          swatchImages: metafield(namespace: "custom", key: "swatch_images") {
            value
          }
        }
      }
    }
  }
`

export { productsQuery }
