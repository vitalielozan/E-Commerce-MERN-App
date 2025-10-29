import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../components/CustomInput.jsx'
import { validateEmail } from '../services/helper.js'
import axiosInstance from '../services/axiosInstance.js'
import { API_PATHS } from '../services/apiPaths.js'
import { useAuthContext } from '../hooks/useAuthContext.js'
import AuthLayout from '../layout/AuthLayout.jsx'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { updateUser } = useAuthContext()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError('Please enter a vald email adress.')
      return
    }
    if (!password) {
      setError('Please enter the password.')
      return
    }
    setError('')
    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })
      const { token, user } = response.data
      if (token) {
        localStorage.setItem('token', token)
        updateUser(user)
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Something went wrong. Please try again')
      }
    }
  }

  return (
    <AuthLayout>
      <div className="flex h-3/4 flex-col justify-center md:h-full lg:w-[70%]">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome Back
        </h3>
        <p className="mb-6 mt-[5px] text-xs text-gray-700 dark:text-gray-400">
          Please enter your details to log in.
        </p>

        <form onSubmit={handleLogin}>
          <CustomInput
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Adress"
            placeholder="john@example.com"
            type="text"
          />
          <CustomInput
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
          {error && <p className="pb-2.5 text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            title="Login"
            className="btn"
            onClick={() => navigate('/')}
          >
            LOGIN
          </button>
          <p className="mt-3 text-[13px] text-gray-700 dark:text-gray-400">
            Don't have an account?
            <Link className="font-medium text-blue-600 underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
