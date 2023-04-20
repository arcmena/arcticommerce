import { Product } from '@shopify/schema'
import ProductCard from '../ProductCard/ProductCard'

interface ProductGridProps {
  products: Product[]
  gridClassname?: string
}

const ProductGrid = (props: ProductGridProps) => {
  const {
    products,
    gridClassname = 'grid grid-cols-2 gap-4 md:mt-8 md:grid-cols-4 md:gap-8'
  } = props

  return (
    <div className={gridClassname}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
