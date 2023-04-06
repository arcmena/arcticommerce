import { gql } from 'graphql-request'

import { shopifyClient } from '@shopify/client'
import { ProductWithVariants } from '@shopify/schema'

const productRecommendationsQuery = gql`
  query productRecommendationsQuery($productId: ID!) {
    productRecommendations(productId: $productId) {
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
`

export interface GetProductRecommendationsResult {
  productRecommendations?: ProductWithVariants[]
}

const getProductRecommendations = async (productId: string) => {
  const recommendation =
    await shopifyClient.request<GetProductRecommendationsResult>(
      productRecommendationsQuery,
      {
        productId
      }
    )

  return recommendation?.productRecommendations
}

export { getProductRecommendations }
