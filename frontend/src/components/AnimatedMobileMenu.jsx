import React from 'react'
import { motion as Motion, easeOut } from 'framer-motion'
import { IoHome, IoCart, IoHeart, IoLogIn } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import LogOut from './LogOut.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { useAuthContext } from '../hooks/useAuthContext.js'

function AnimatedMobileMenu() {
  const { user } = useAuthContext()

  return (
    <Motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.2, ease: easeOut }}
      className="space-y-2 px-5 pb-4 md:hidden"
    >
      <Link
        to="/"
        className="block text-gray-900 hover:underline dark:text-gray-300"
      >
        <IoHome className="size-7" title="Home" />
      </Link>
      <Link
        to="/favorites"
        className="block text-gray-900 hover:underline dark:text-gray-300"
      >
        <IoHeart className="size-7" title="Favorites" />
      </Link>
      <Link
        to="/cart"
        className="block text-gray-900 hover:underline dark:text-gray-300"
      >
        <IoCart className="size-7" title="Cart" />
      </Link>
      {user ? (
        <LogOut />
      ) : (
        <Link
          to="/login"
          className="block text-gray-900 hover:underline dark:text-gray-300"
        >
          <IoLogIn className="size-7" title="LogIn" />
        </Link>
      )}
      <ThemeToggle />

      <SearchBar />
    </Motion.div>
  )
}

export default AnimatedMobileMenu
