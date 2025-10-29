import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@heroui/react'
import ProductCard from './ProductCard.jsx'
import MotionDiv from './MotionDiv.jsx'

function BrandsGalery({ brandsData }) {
  const [currentPage, setCurrentPage] = useState(1)
  const rawArray = Array.isArray(brandsData) ? brandsData : []
  const grouped = rawArray.reduce((acc, product) => {
    const brand = product.brand || 'Unknown'
    if (!acc[brand]) acc[brand] = []
    acc[brand].push(product)
    return acc
  }, {})

  const brandsPerPage = 2
  const productsPerBrand = 3

  const brandsArray = Object.entries(grouped)
  const totalPages = Math.ceil(brandsArray.length / brandsPerPage)
  const startIndex = (currentPage - 1) * brandsPerPage
  const currentBrands = brandsArray.slice(
    startIndex,
    startIndex + brandsPerPage
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <>
      <h1 className="mx-5 mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        All Brands
      </h1>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          <Button
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            size="sm"
            className="disabled:opacity-50"
          >
            Prev
          </Button>
          <Button
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            size="sm"
            className="disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}
      <div className="space-y-12">
        {currentBrands.map(([brandName, products]) => (
          <div key={brandName}>
            <div className="mx-5 mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-500">
                {brandName}
              </h3>
              <Link
                to={`/brand/${brandName}`}
                className="text-sm text-indigo-700 hover:underline"
              >
                View All
              </Link>
            </div>
            <MotionDiv>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {products.slice(0, productsPerBrand).map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                  />
                ))}
              </div>
            </MotionDiv>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          <Button
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            size="sm"
            className="disabled:opacity-50"
          >
            Prev
          </Button>
          <Button
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            size="sm"
            className="disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}
    </>
  )
}

export default BrandsGalery
