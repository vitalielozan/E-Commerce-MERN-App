import axiosInstance from './axiosInstance.js'
import { API_PATHS } from './apiPaths.js'

export const fetchAllProducts = async () => {
  try {
    const res = await axiosInstance.get(`${API_PATHS.PRODUCT.GET_ALL_PRODUCTS}`)
    return res.data
  } catch (error) {
    console.error('Error by fetchAllProducts:', error.message)
    throw error
  }
}

export const fetchProductsByBrand = async (brandName) => {
  try {
    const res = await axiosInstance.get(
      `${API_PATHS.PRODUCT.GET_PRODUCT_BRAND(brandName)}`
    )
    return res.data || []
  } catch (error) {
    console.error('Error by fetchProductsByBrand:', error.message)
    throw error
  }
}

export const fetchProductById = async (id) => {
  try {
    const res = await axiosInstance.get(`${API_PATHS.PRODUCT.GET_PRODUCT(id)}`)
    return res.data
  } catch (error) {
    console.error('Error by fetchProductById:', error.message)
    throw error
  }
}

export const fetchRawProductsData = async () => {
  try {
    const res = await axiosInstance.get(`${API_PATHS.PRODUCT.GET_RAW_PRODUCTS}`)

    return res.data
  } catch (error) {
    console.error('Error by fetchRawProductsData:', error.message)
    throw error
  }
}
