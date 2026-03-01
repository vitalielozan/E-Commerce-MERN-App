import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode.js';
import { MdDarkMode } from 'react-icons/md';
import { MdLightMode } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useDarkMode();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {darkMode ? (
        <MdLightMode className="size-6" title={t('common.theme.light')} />
      ) : (
        <MdDarkMode className="size-6" title={t('common.theme.dark')} />
      )}
    </button>
  );
}

export default ThemeToggle;
