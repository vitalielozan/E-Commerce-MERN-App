export const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : '/api';

export const API_PATHS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    UPDATE_CHECK_OUT: '/auth/update',
    GET_USER_INFO: '/auth/getUser'
  },
  PRODUCT: {
    GET_ALL_PRODUCTS: '/products/get',
    GET_RAW_PRODUCTS: '/products/raw',
    GET_PRODUCT_BRAND: (brand) => `/products/brand/${brand}`,
    GET_PRODUCT: (productId) => `/products/${productId}`
  },
  CART: {
    ADD_TO_CART: '/cart/add',
    GET_ALL_FROM_CART: '/cart/get',
    CLEAR_CART: '/cart/cart',
    DELETE_FROM_CART: (productId) => `/cart/${productId}`
  },
  FAVORITE: {
    ADD_TO_FAVORITE: '/favorite/add',
    ADD_TO_CART_FROM_FAV: '/favorite/to-cart',
    GET_ALL_FROM_FAVORITE: '/favorite/get',
    DELETE_FROM_FAVORITE: (productId) => `/favorite/${productId}`
  },
  REVIEWS: {
    ADD_REVIEW: '/reviews/add',
    GET_REVIEW: (productId) => `/reviews/${productId}`,
    DELETE_REVIEW: (reviewId) => `/reviews/${reviewId}`
  }
};
