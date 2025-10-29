import { useParams } from 'react-router-dom'
import { useFetchProducts } from '../hooks/useFetchProducts.js'
import ProductCard from '../components/ProductCard.jsx'
import MotionDiv from '../components/MotionDiv.jsx'
import { Spinner } from '@heroui/react'

function BrandDetailsPage() {
  const { brandName } = useParams()
  const {
    data: products,
    loading,
    error
  } = useFetchProducts('brand', brandName)

  const brandDesc = {
    SAMSUNG: 'Samsung, modern innovative electronics for smart living',
    JVC: 'Reliable sound and video solutions with JVC',
    PANASONIC: 'Panasonic bringt advanced tech for everyday use',
    LG: 'Smart appliances for modern homes with LG',
    SHARP: 'High-performance screens and electronics with Sharp',
    HISENSE: 'Affordable quality with modern features'
  }
  const discription = brandDesc[brandName] || `${brandName} brand products`

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner
          size="lg"
          color="primary"
          label="Loading..."
          labelColor="primary"
        />
      </div>
    )

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading product.
      </div>
    )

  return (
    <>
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
        {discription}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No products found for {brandName}.
        </p>
      ) : (
        <MotionDiv>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </MotionDiv>
      )}
    </>
  )
}
export default BrandDetailsPage
