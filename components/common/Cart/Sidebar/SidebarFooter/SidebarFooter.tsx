import Button from '@components/Elements/Button'
import { useLayout } from '@components/common/Layout/Context'

import { Checkout } from '@shopify/schema'
import { getProductPrice } from '@shopify/utils/getProductPrice'

interface SidebarFooterProps {
  checkout: Checkout
}

const SidebarFooter = (props: SidebarFooterProps) => {
  const { checkout } = props
  const { totalPrice } = checkout

  const { price: totalCheckoutPrice } = getProductPrice({ price: totalPrice })

  const { closeCartSidebar } = useLayout()

  // TODO: add checkout redirect
  // TODO: add checkout update to add note

  return (
    <div className="pt-8 block w-full">
      <div className="text-center pb-8">
        <label
          htmlFor="cart-note"
          className="uppercase text-[13px] tracking-[1px] pb-2 block"
        >
          Leave a note with your order
        </label>
        <textarea
          name="note"
          id="cart-note"
          className="h-[80px] p-2 appearance-none bg-white rounded-sm border-[1px] border-gray-200 text-black overflow-auto w-full"
        />
      </div>

      <div>
        <div className="text-center pb-4">
          <div className="text-lg md:text-xl pb-2 leading-6 tracking-[1px]">
            Total
          </div>
          <div className="text-base md:text-xl leading-5 tracking-[1px]">
            {totalCheckoutPrice} {totalPrice.currencyCode}
          </div>
        </div>

        <div className="pb-4 text-[15px] text-center leading-5">
          Taxes and shipping calculated at checkout
        </div>

        <div>
          <Button className="w-full">Checkout</Button>

          <button
            onClick={closeCartSidebar}
            className="mt-4 mx-auto block uppercase underline underline-offset-[3px] text-[13px] tracking-[1px]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default SidebarFooter
