import { useEffect, useState } from 'react'
import {
  fetchAllProducts,
  fetchProductsByBrand,
  fetchProductById,
  fetchRawProductsData
} from '../services/apiProducts.js'

export const useFetchProducts = (type = 'all', param = null, delay = 500) => {
  const [data, setData] = useState(type === 'id' ? null : [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let timeoutId
    const fetchData = async () => {
      try {
        let result

        switch (type) {
          case 'all':
            result = await fetchAllProducts()
            break
          case 'raw':
            result = await fetchRawProductsData()
            break
          case 'brand':
            result = await fetchProductsByBrand(param)
            break
          case 'id':
            result = await fetchProductById(param)
            break
          default:
            throw new Error('Unknow fetching type.')
        }

        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        timeoutId = setTimeout(() => {
          setLoading(false)
        }, delay)
      }
    }

    fetchData()

    return () => clearTimeout(timeoutId)
  }, [type, param, delay])

  return { data, loading, error }
}
