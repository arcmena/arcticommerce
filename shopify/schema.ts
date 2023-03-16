export interface Image {
  url: string
  altText?: string
}

export interface Collection {
  id: string
  title: string
  handle: string
}

export interface Product {
  id: string
  title: string
  description: string
  descriptionHtml: string
  handle: string
  images: Entities<Image>
  collections: Entities<Collection>
  swatchImages?: {
    value: string
  }
  availableForSale: boolean
}

export interface ProductOption {
  id: string
  name: string
  values: [string]
}

export interface ProductPrice {
  amount: string
  currencyCode: string
}

export interface ProductVariant {
  id: string
  title: string
  sku: string
  selectedOptions: {
    name: string
    value: string
  }[]
  price: ProductPrice
  compareAtPrice: ProductPrice
  image: Image
  product: {
    handle: string
  }
  availableForSale: boolean
}

export interface ProductWithVariants extends Product {
  options?: [ProductOption]
  variants?: Entities<ProductVariant>
}

export interface CheckoutLineItem {
  id: string
  quantity: number
  title: string
  variant: ProductVariant
}

export interface Checkout {
  id: string
  webUrl: string
  completedAt?: string
  createdAt: string
  totalPrice: ProductPrice
  subtotalPrice: ProductPrice
  lineItems: Entities<CheckoutLineItem>
}

export interface EntityNode<T> {
  node: T
}

export interface Entities<T> {
  edges: Array<EntityNode<T>>
}
