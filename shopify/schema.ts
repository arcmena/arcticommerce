export interface Image {
  url: string
  altText?: string
}

export interface Product {
  id: string
  title: string
  description: string
  handle: string
  images: Entities<Image>
}

export interface ProductOption {
  id: string
  name: string
  values: [string]
}

export interface ProductVariant {
  id: string
  title: string
  sku: string
  selectedOptions: {
    name: string
    value: string
  }
}

export interface ProductWithVariants extends Product {
  options: [ProductOption]
  variants: Entities<ProductVariant>
}

export interface EntityNode<T> {
  node: T
}

export interface Entities<T> {
  edges: [EntityNode<T>]
}
