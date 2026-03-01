import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from '@heroui/react';
import { useTranslation } from 'react-i18next';

function EmptyMasage({ imageSrc, message }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-around gap-3 py-3">
      <Image alt="Shopping Bag" src={imageSrc} width={300} />
      <p className="mb-5">{message}</p>
      <Button
        as={Link}
        to={'/brands'}
        className="rounded-lg bg-gray-950 from-cyan-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-linear-to-r"
      >
        {t('common.continueShopping')}
      </Button>
    </div>
  );
}

export default EmptyMasage;
