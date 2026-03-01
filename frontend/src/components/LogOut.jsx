import React from 'react';
import { Link } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useTranslation } from 'react-i18next';

function LogOut() {
  const { clearUser } = useAuthContext();
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      onClick={() => clearUser()}
      className="text-sm font-medium text-slate-700 transition-colors hover:text-sky-600 dark:text-slate-300"
    >
      {t('nav.logout')}
    </Link>
  );
}

export default LogOut;
