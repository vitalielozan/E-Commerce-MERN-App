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
import { useTranslation } from 'react-i18next';

function Header() {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 py-3 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80"
    >
      {({ open }) => (
        <>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-2 md:px-6">
            <div className="flex items-center gap-3">
              <Avatar size="md" radius="md" src="/avatar.png" />
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                <Link to="/">TV-Maxx</Link>
              </h1>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <Link
                to="/"
                className="text-sm font-medium text-slate-700 transition-colors hover:text-sky-600 dark:text-slate-300"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/favorites"
                className="text-sm font-medium text-slate-700 transition-colors hover:text-sky-600 dark:text-slate-300"
              >
                {t('nav.favorites')}
              </Link>
              <Link
                to="/cart"
                className="text-sm font-medium text-slate-700 transition-colors hover:text-sky-600 dark:text-slate-300"
              >
                {t('nav.cart')}
              </Link>
              {user ? (
                <LogOut />
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 transition-colors hover:text-sky-600 dark:text-slate-300"
                >
                  {t('nav.login')}
                </Link>
              )}
              <SearchBar />
              <ThemeToggle />
            </div>

            <DisclosureButton className="rounded-md border border-slate-200 p-2 text-2xl text-slate-700 md:hidden dark:border-slate-700 dark:text-slate-300">
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
