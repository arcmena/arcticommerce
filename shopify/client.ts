import { GraphQLClient } from 'graphql-request'

const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL || ''
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''

const shopifyClient = new GraphQLClient(SHOPIFY_API_URL, {
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
  }
})

export { shopifyClient }
