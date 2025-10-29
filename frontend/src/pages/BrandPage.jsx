import React from 'react'
import { useFetchProducts } from '../hooks/useFetchProducts.js'
import { Spinner } from '@heroui/react'
import BrandsGalery from '../components/BrandsGalery.jsx'

function BrandPage() {
  const { data: brandsData, loading, error } = useFetchProducts('raw')

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
    <div className="px-4 py-10">
      <BrandsGalery brandsData={brandsData} />
    </div>
  )
}

export default BrandPage
