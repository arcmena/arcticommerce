import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { shopifyClient } from '../../shopify/client'
import { productDetailQuery } from '../../shopify/queries/productDetailQuery'
import { ProductWithVariants } from '../../shopify/schema'

type ProductDetailResultType = {
  productByHandle?: ProductWithVariants
}

export const getServerSideProps: GetServerSideProps = async props => {
  const { params } = props

  const { productByHandle } =
    await shopifyClient.request<ProductDetailResultType>(productDetailQuery, {
      handle: params!.handle
    })

  if (!productByHandle) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productResult: productByHandle
    }
  }
}

type ProductDetailPageProps = {
  productResult: ProductWithVariants
}

const PDP = ({ productResult }: ProductDetailPageProps) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-5">
        <div className="col-span-3">
          <Image
            src={productResult.images.edges[0].node.url}
            alt={productResult.images.edges[0].node.altText}
            width={1000}
            height={1000}
          />
        </div>
        <div className="col-span-2">
          <h1 className="text-blue-800 text-xl">{productResult.title}</h1>
          <h2 className="text-gray-300 text-lg">{productResult.description}</h2>
          <div>
            {productResult.options.map(({ name, values }) => (
              <div key={name}>
                <span>{name}</span>

                <ul className="ml-4">
                  {values.map(val => (
                    <li key={val}>
                      <button>{val}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default PDP