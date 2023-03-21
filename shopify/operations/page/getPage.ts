import { shopifyClient } from '@shopify/client'
import { Page } from '@shopify/schema'
import { pageQuery } from '@shopify/queries/getPageQuery'

export interface GetPageResult {
  page?: Page
}

const getPage = async (handle: string) => {
  return await shopifyClient.request<GetPageResult>(pageQuery, {
    handle
  })
}

export { getPage }
