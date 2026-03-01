import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { IoHome, IoCart, IoHeart, IoLogIn } from 'react-icons/io5';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useAuthContext } from '../hooks/useAuthContext.js';
import LogOut from './LogOut.jsx';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/80 px-4 py-6 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-2 text-center text-sm md:grid-cols-4 md:text-left">
        <div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            TV-Maxx
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            {t('footer.tagline')}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-3 text-base md:justify-start">
          <Link
            to="/"
            onClick={scrollToTop}
            className="text-slate-700 transition-colors hover:text-sky-600 dark:text-slate-300"
          >
            <IoHome className="size-7" title={t('nav.home')} />
          </Link>
          <Link
            to="/favorites"
            onClick={scrollToTop}
            className="text-slate-700 transition-colors hover:text-sky-600 dark:text-slate-300"
          >
            <IoHeart className="size-7" title={t('nav.favorites')} />
          </Link>
          <Link
            to="/cart"
            onClick={scrollToTop}
            className="text-slate-700 transition-colors hover:text-sky-600 dark:text-slate-300"
          >
            <IoCart className="size-7" title={t('nav.cart')} />
          </Link>
          {user ? (
            <LogOut />
          ) : (
            <Link
              to="/login"
              onClick={scrollToTop}
              className="text-slate-700 transition-colors hover:text-sky-600 dark:text-slate-300"
            >
              <IoLogIn className="size-7" title={t('nav.login')} />
            </Link>
          )}
        </div>

        <div className="space-y-5">
          <p className="font-semibold text-slate-900 dark:text-slate-300">
            {t('footer.followUs')}
          </p>
          <div className="flex justify-center space-x-4 md:justify-start">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300"
              aria-label="Facebook"
            >
              <FaFacebook className="h-8 w-8" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 transition-colors hover:text-pink-500 dark:text-slate-300"
              aria-label="Instagram"
            >
              <FaInstagram className="h-8 w-8" />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 transition-colors hover:text-red-800 dark:text-slate-300"
              aria-label="Tiktok"
            >
              <FaTiktok className="h-8 w-8" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <LanguageSwitcher className="mx-auto w-full max-w-40 text-slate-900 md:mx-0 dark:text-white" />
        </div>
      </div>
      <hr className="mx-auto my-4 max-w-7xl border-t border-slate-200 dark:border-slate-800" />

      <p className="py-2 text-center text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} {t('footer.rights')}
      </p>
    </footer>
  );
}

export default Footer;
