import React from 'react';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="my-5 flex h-full flex-col items-center justify-center bg-white py-5 dark:bg-gray-800">
      <h1 className="my-10 text-3xl font-bold text-slate-900 dark:text-white">
        {t('notFound.oops')}
      </h1>
      <p className="my-10 max-w-md text-base text-gray-700 dark:text-slate-400">
        {t('notFound.message')}
      </p>
      <Button
        color="danger"
        className="my-10 rounded-md bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
        onPress={handleGoBack}
      >
        {t('notFound.goBack')}
      </Button>
    </div>
  );
};

export default NotFoundPage;
