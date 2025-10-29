import React from 'react'
import { Link } from 'react-router'
import { IoLogOut } from 'react-icons/io5'
import { useAuthContext } from '../hooks/useAuthContext.js'

function LogOut() {
  const { clearUser } = useAuthContext()

  return (
    <Link
      to="/"
      onClick={() => clearUser()}
      className="text-gray-900 hover:underline dark:text-gray-300"
    >
      <IoLogOut className="size-8" title="LogOut" />
    </Link>
  )
}

export default LogOut
