import { ProductPrice } from '@shopify/schema'

const getProductPrice = ({ price }: { price: ProductPrice }) => {
  return {
    price: Number(price.amount).toLocaleString('en-US', {
      style: 'currency',
      currency: price.currencyCode
    })
  }
}

export { getProductPrice }
