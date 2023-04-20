import Link from 'next/link'
import Image from 'next/image'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'

import { getProductUrl } from '@shopify/utils/getProductUrl'
import { getProductPrice } from '@shopify/utils/getProductPrice'
import { CheckoutLineItem } from '@shopify/schema'

import { useCart } from '../../Context'

interface SidebarProductProps {
  productData: CheckoutLineItem
}

const SidebarProduct = ({ productData }: SidebarProductProps) => {
  const { variant } = productData

  const { updateCartProduct, removeCartProduct } = useCart()

  const { price } = getProductPrice({ price: variant.price })
  const originalProductUrl = getProductUrl(variant.product.handle)

  const handleQuantityDecrease = () => {
    if (productData.quantity - 1 === 0) {
      return
    }
    updateCartProduct({
      id: productData.id,
      variantId: variant.id,
      quantity: productData.quantity - 1
    })
  }

  const handleQuantityIncrease = () =>
    updateCartProduct({
      id: productData.id,
      variantId: variant.id,
      quantity: productData.quantity + 1
    })

  const handleRemove = () => removeCartProduct(productData.id)

  return (
    <div className="flex items-start flex-wrap gap-3 py-4 border-b-[1px] border-gray-200">
      <div className="w-full text-center">
        <Link
          href={originalProductUrl}
          className="text-[18px] text-gray-900 -tracking-tight"
        >
          {productData.title}
        </Link>
      </div>

      <div className="w-[35%]">
        <Link href={originalProductUrl}>
          <Image
            src={variant.image.url}
            alt={variant.image.altText || ''}
            width={200}
            height={200}
          />
        </Link>
      </div>

      <div
        className="flex-grow text-left"
        style={{ maxWidth: 'calc(65% - 12px)' }}
      >
        <div className="pb-3">
          {variant.title !== 'Default Title' ? (
            <>
              <Link
                href={originalProductUrl}
                className="text-[13px] tracking-[1px]"
              >
                {variant.title}
              </Link>
              <br />
            </>
          ) : null}

          <span className="text-[13px] tracking-[1px]">{price}</span>
        </div>

        <div className="text-left">
          <div className="rounded-sm relative inline-flex border-[1px] border-gray-200 bg-white">
            <button className="px-4" onClick={handleQuantityDecrease}>
              <MinusIcon className="w-4 text-black" />
            </button>
            <div className="h-[38px] px-[18px] border-x-[1px] border-gray-200 text-base flex items-center">
              {productData.quantity}
            </div>
            <button className="px-4" onClick={handleQuantityIncrease}>
              <PlusIcon className="w-4 text-black" />
            </button>
          </div>

          <button
            className="uppercase underline underline-offset-[3px] block text-xs tracking-[1px] mt-3 w-fit"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default SidebarProduct
