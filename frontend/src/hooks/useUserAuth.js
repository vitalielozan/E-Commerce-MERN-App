import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext.js'
import axiosInstance from '../services/axiosInstance.js'
import { API_PATHS } from '../services/apiPaths.js'

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) return
    let isMounted = true
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)

        if (isMounted && response.data) {
          updateUser(response.data)
        }
      } catch (error) {
        console.error('Falied to fetch user info:', error.message)
        if (isMounted) {
          clearUser()
          navigate('/login')
        }
      }
    }
    fetchUserInfo()
    return () => {
      isMounted = false
    }
  }, [user, updateUser, clearUser, navigate])
}
