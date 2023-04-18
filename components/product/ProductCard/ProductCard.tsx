import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'

import { getProductUrl } from '@shopify/utils/getProductUrl'
import { ProductWithVariants } from '@shopify/schema'
import { getProductPrice } from '@shopify/utils/getProductPrice'

interface ProductCardProps {
  product: ProductWithVariants
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { swatchImages } = product

  const previewImages = swatchImages && JSON.parse(swatchImages?.value!)

  return (
    <Link href={getProductUrl(product.handle)}>
      <div>
        <Image
          src={product.images.edges[0].node.url}
          alt={product.images.edges[0].node.altText || ''}
          width={687}
          height={687}
        />
      </div>
      <div className="text-center flex flex-col gap-2 mt-4">
        <p className="text-[15px]">{product.title}</p>
        <div className="text-[13px] flex flex-row gap-1 justify-center">
          {product?.variants?.edges[0].node.compareAtPrice ? (
            <span className="line-through text-gray-600 h-fit align-bottom ml-1">
              {
                getProductPrice({
                  price: product?.variants?.edges[0].node.compareAtPrice!
                }).price
              }
            </span>
          ) : null}
          <span>
            {
              getProductPrice({
                price: product?.variants?.edges[0].node.price!
              }).price
            }
          </span>
        </div>

        <div>
          {product?.options?.map(
            option =>
              option.name === 'Color' &&
              option.values.map(colorOption => (
                <button
                  key={colorOption}
                  className={cn(
                    'border-2 border-gray-200 w-[25px] min-w-[25px] h-[25px] rounded-full relative inline-block'
                  )}
                  style={{
                    backgroundImage: `url(${
                      previewImages?.[
                        colorOption.replace(' ', '').toLowerCase()
                      ]
                    })`,
                    backgroundSize: 'cover'
                  }}
                />
              ))
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
