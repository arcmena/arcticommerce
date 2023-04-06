import { gql } from 'graphql-request'

import { shopifyClient } from '@shopify/client'
import { Product } from '@shopify/schema'

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
    }
  }
`

export interface GetProductRecommendationsResult {
  productRecommendations?: Product[]
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
