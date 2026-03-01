import React from 'react';
import { motion as Motion, easeOut } from 'framer-motion';
import { IoHome, IoCart, IoHeart, IoLogIn } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import LogOut from './LogOut.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useTranslation } from 'react-i18next';

function AnimatedMobileMenu() {
  const { user } = useAuthContext();
  const { t } = useTranslation();

  return (
    <Motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.2, ease: easeOut }}
      className="mx-4 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg md:hidden dark:border-slate-700 dark:bg-slate-900"
    >
      <Link
        to="/"
        className="block rounded-lg px-2 py-1 text-lg font-medium text-slate-800 transition-colors hover:bg-slate-100 hover:text-sky-600 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {t('nav.home')}
      </Link>
      <Link
        to="/favorites"
        className="block rounded-lg px-2 py-1 text-lg font-medium text-slate-800 transition-colors hover:bg-slate-100 hover:text-sky-600 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {t('nav.favorites')}
      </Link>
      <Link
        to="/cart"
        className="block rounded-lg px-2 py-1 text-lg font-medium text-slate-800 transition-colors hover:bg-slate-100 hover:text-sky-600 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {t('nav.cart')}
      </Link>
      {user ? (
        <LogOut />
      ) : (
        <Link
          to="/login"
          className="block rounded-lg px-2 py-1 text-lg font-medium text-slate-800 transition-colors hover:bg-slate-100 hover:text-sky-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {t('nav.login')}
        </Link>
      )}
      <ThemeToggle />

      <SearchBar />
    </Motion.div>
  );
}

export default AnimatedMobileMenu;
