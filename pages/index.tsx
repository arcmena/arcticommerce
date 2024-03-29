import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from 'next/types'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'

import { shopifyClient } from '@shopify/client'
import { Entities, Collection } from '@shopify/schema'
import { collectionsQuery } from '@shopify/queries/collectionsQuery'

import ProductGrid from '@components/product/ProductGrid/ProductGrid'

import s from 'styles/pages/Home.module.css'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type ProductsResultType = {
  collections?: Entities<Collection>
}

export const getStaticProps: GetServerSideProps = async () => {
  const collectionsResult = await shopifyClient.request<ProductsResultType>(
    collectionsQuery
  )

  const collectionsWithProducts = collectionsResult.collections?.edges.filter(
    collection => collection.node.products.edges.length !== 0
  )

  return {
    props: {
      collectionsResult: collectionsWithProducts
    }
  }
}

type HomePageProps = {
  collectionsResult?: [{ node: Collection }]
}

const HomePage = ({ collectionsResult }: HomePageProps) => {
  const featuredCollection = collectionsResult?.[0]?.node

  const featuredCollectionsGrid = collectionsResult?.slice(1).slice(0, 2)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="relative flex">
          <Swiper
            slidesPerView="auto"
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            autoplay={{
              delay: 2500
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                effect: 'fade'
              },
              640: {
                slidesPerView: 1,
                effect: 'fade'
              },
              768: {
                slidesPerView: 3,
                effect: 'fade'
              }
            }}
            className={s['container']}
          >
            <SwiperSlide className="imageWrapper">
              <Image
                src="https://cdn.shopify.com/s/files/1/0696/9747/0737/files/Water-bottle-drinking_1000X1000_f16650bf-4bf7-49c6-b19d-875d024ccda7.webp?v=1682436617"
                alt=""
                width={500}
                height={500}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </SwiperSlide>
            <SwiperSlide className="imageWrapper">
              <Image
                src="https://cdn.shopify.com/s/files/1/0696/9747/0737/files/Rucksack_magazine_x_The_Level_Collective_journal_PNW_1.jpg?v=1682436617"
                alt=""
                width={500}
                height={500}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </SwiperSlide>
            <SwiperSlide className="imageWrapper">
              <Image
                src="https://cdn.shopify.com/s/files/1/0696/9747/0737/files/Simple-Mountain-Organic-Cotton-Sweater-Navy-BC-The-Level-Collective_1000X1000_38f71648-8352-4017-8ba0-553950912955.webp?v=1682436617"
                alt=""
                width={500}
                height={500}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        {featuredCollection &&
        featuredCollection?.products.edges.length !== 0 ? (
          <div className="bg-[#ffffff] py-8 px-4 md:py-[72px] md:px-12">
            <div className="mx-auto">
              <h2 className="text-[22px] md:text-[28px] text-center mb-8 md:mb-0">
                {featuredCollection.title}
              </h2>

              <ProductGrid
                products={featuredCollection.products?.edges.map(
                  item => item.node
                )}
              />
            </div>
          </div>
        ) : null}

        {featuredCollectionsGrid && featuredCollectionsGrid.length !== 0 ? (
          <div className="grid grid-cols-2 gap-4 text-center bg-[#f7f7f7] px-4 pt-8 pb-16 md:gap-8 md:px-12 md:pt-[72px] md:pb-[72px]">
            {featuredCollectionsGrid.map(collection => (
              <Link
                key={collection.node.id}
                href={`/collection/${collection.node.handle}`}
                className="relative"
              >
                <div className="h-full flex flex-col">
                  <div className="h-full min-h-full">
                    <Image
                      src={collection.node.image.url}
                      alt={collection.node.image.altText || ''}
                      width={500}
                      height={500}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div className="mt-3 md:mt-0 md:absolute md:w-full md:h-full md:flex md:items-center md:justify-center md:opacity-0 md:hover:opacity-100 md:hover:bg-white md:hover:bg-opacity-80 transition-all ease-in-out duration-300">
                    <h3 className="text-lg font-normal leading-[22px]">
                      {collection.node.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default HomePage
