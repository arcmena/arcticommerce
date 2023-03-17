import Image from 'next/image'

import { EntityNode, Image as ImageType } from '@shopify/schema'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'

import s from './ProductGallery.module.css'

interface ProductGalleryProps {
  galleryEntries: EntityNode<ImageType>[]
}

const ProductGallery = (props: ProductGalleryProps) => {
  const { galleryEntries } = props

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.23}
      centeredSlides
      modules={[Pagination]}
      pagination={{
        dynamicBullets: true,
        clickable: true
      }}
      className={s['container']}
    >
      {galleryEntries.map(({ node: image }, index) => (
        <SwiperSlide key={`${image.altText}-${index}`}>
          <Image
            src={image.url}
            alt={image.altText || ''}
            width={500}
            height={500}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ProductGallery
