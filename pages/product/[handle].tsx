import { useCallback, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import cn from 'classnames'

import { shopifyClient } from '@shopify/client'
import { Page, ProductWithVariants } from '@shopify/schema'
import { productDetailQuery } from '@shopify/queries/productDetailQuery'
import { getProductPrice } from '@shopify/utils/getProductPrice'

import Button from '@components/Elements/Button'
import { OptionSelector } from '@components/common/OptionSelector'
import ProductGallery from '@components/product/ProductGallery'
import { useCart } from '@components/common/Cart/Context'

import s from 'styles/pages/PDP.module.css'
import { getPage } from '@shopify/operations/page/getPage'

type ProductDetailResultType = {
  productByHandle?: ProductWithVariants
}

export const getServerSideProps: GetServerSideProps = async props => {
  const { params } = props
  const { handle } = params as { handle: string }

  const { productByHandle } =
    await shopifyClient.request<ProductDetailResultType>(productDetailQuery, {
      handle: handle
    })

  const pageData = await getPage(handle)

  if (!productByHandle) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productResult: productByHandle,
      pageData: pageData.page
    }
  }
}

type ProductDetailPageProps = {
  productResult: ProductWithVariants
  pageData: Page
}

const PDP = ({ productResult, pageData }: ProductDetailPageProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const { addProductToCart } = useCart()

  const [activeVariant, setActiveVariant] = useState(
    productResult?.variants?.edges[0].node
  )

  const isConfigurableProduct = productResult?.options?.[0].name !== 'Title'

  const isProductInStock = activeVariant!.availableForSale

  const handleAddToCart = async () => {
    const { id } = activeVariant!

    // TODO: add loading state to button

    if (!isAddingToCart) {
      if (isProductInStock) {
        setIsAddingToCart(true)

        await addProductToCart(id)

        setIsAddingToCart(false)
      }
    }
  }

  const updateActiveVariant = useCallback(
    (selectedOptions: { name: string; value: string }[]) => {
      const { variants } = productResult

      const newActiveVariant = variants?.edges.find(({ node }) =>
        node.selectedOptions.every(
          ({ name, value }, index) =>
            name === selectedOptions[index].name &&
            value === selectedOptions[index].value
        )
      )?.node

      if (newActiveVariant) {
        setActiveVariant(newActiveVariant)
      }
    },
    [productResult]
  )

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className="md:pr-8">
          <div className="md:mx-auto md:flex md:justify-center md:relative md:gap-8 ">
            <div className={cn(s['gallery-container'])}>
              <ProductGallery galleryEntries={productResult.images.edges} />
            </div>
            <div className={cn('px-4 py-8', s['info-container'])}>
              <div>
                <h1 className="text-black text-[22px] text-center">
                  {productResult.title}
                </h1>
                <span className="mt-3 text-center block text-black text-[13px] uppercase tracking-widest">
                  {productResult.collections?.edges[0]?.node?.title}
                </span>
              </div>
              <div className="flex mt-4 tracking-widest justify-center">
                <span className="text-base">
                  {getProductPrice({ price: activeVariant!.price }).price}
                </span>
                {activeVariant!.compareAtPrice ? (
                  <span className="text-[13px] line-through text-gray-600 h-fit align-bottom pt-[3px] ml-1">
                    {
                      getProductPrice({ price: activeVariant!.compareAtPrice })
                        .price
                    }
                  </span>
                ) : null}
              </div>

              <div className="mt-8">
                {isConfigurableProduct && (
                  <OptionSelector
                    product={productResult}
                    activeVariant={activeVariant!}
                    updateActiveVariant={updateActiveVariant}
                  />
                )}
              </div>

              <div className="mt-8">
                <Button
                  onClick={handleAddToCart}
                  variant={'filled'}
                  className="w-full"
                  disabled={!isProductInStock}
                  loading={isAddingToCart}
                >
                  {isProductInStock ? 'Add to Cart' : 'Out of stock'}
                </Button>
              </div>

              {productResult.descriptionHtml ? (
                <div
                  className={cn('mt-8', s['description-html'])}
                  dangerouslySetInnerHTML={{
                    __html: productResult.descriptionHtml
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div>
          {pageData?.body ? (
            <div
              className={cn(s['content-html'])}
              dangerouslySetInnerHTML={{
                __html: pageData.body
              }}
            />
          ) : null}
        </div>
      </>
    </>
  )
}

export default PDP
