import React from 'react';
import { Link } from 'react-router';
import { Avatar } from '@heroui/react';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { IoHome, IoCart, IoHeart, IoLogIn } from 'react-icons/io5';
import { AnimatePresence } from 'framer-motion';
import AnimatedMobileMenu from './AnimatedMobileMenu.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import SearchBar from './SearchBar.jsx';
import { useAuthContext } from '../hooks/useAuthContext.js';
import LogOut from './LogOut.jsx';

function Header() {
  const { user } = useAuthContext();
  return (
    <Disclosure
      as="nav"
      className="bg-gray-100/80 py-3 shadow dark:bg-gray-900/50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-4 px-4 py-3">
            <Avatar size="lg" radius="md" src="/avatar.png" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              <Link to="/">TV-Maxx</Link>
            </h1>

            <div className="hidden items-center space-x-4 md:flex">
              <Link
                to="/"
                className="text-xl text-gray-900 hover:underline dark:text-gray-300"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className="text-xl text-gray-900 hover:underline dark:text-gray-300"
              >
                Favorites
              </Link>
              <Link
                to="/cart"
                className="text-xl text-gray-900 hover:underline dark:text-gray-300"
              >
                Cart
              </Link>
              {user ? (
                <LogOut />
              ) : (
                <Link
                  to="/login"
                  className="text-xl text-gray-900 hover:underline dark:text-gray-300"
                >
                  LogIn
                </Link>
              )}
              <SearchBar />
              <ThemeToggle />
            </div>

            <DisclosureButton className="text-3xl text-gray-900 md:hidden dark:text-gray-300">
              ☰
            </DisclosureButton>
          </div>

          <AnimatePresence initial={false}>
            {open && <AnimatedMobileMenu />}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
