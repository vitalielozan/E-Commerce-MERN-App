import React, { useEffect, useState } from 'react'
import { AuthContext } from './context.js'
import axiosInstance from '../services/axiosInstance.js'
import { API_PATHS } from '../services/apiPaths.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axiosInstance
        .get(API_PATHS.AUTH.GET_USER_INFO)
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => {
          console.error('Failed to load user after refresh', err)
          localStorage.removeItem('token')
          setUser(null)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  const updateUser = (userData) => {
    setUser(userData)
  }

  const clearUser = () => {
    setUser(null)
  }

  const updateCheckOut = async (checkoutData) => {
    try {
      const updatedUser = {
        ...user,
        lastCheckout: checkoutData
      }
      setUser(updatedUser)
      await axiosInstance.patch(API_PATHS.AUTH.UPDATE_CHECK_OUT, {
        lastCheckout: checkoutData
      })
    } catch (error) {
      console.error('Failed to update checkout on  server:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        updateUser,
        clearUser,
        updateCheckOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
