import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts.js';
import { Spinner } from '@heroui/react';
import BrandsGalery from '../components/BrandsGalery.jsx';
import { useTranslation } from 'react-i18next';

function BrandPage() {
  const { t } = useTranslation();
  const { data: brandsData, loading, error } = useFetchProducts('raw');

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner
          size="lg"
          color="primary"
          label={t('common.loading')}
          labelColor="primary"
        />
      </div>
    );

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        {t('common.errorLoadingProduct')}
      </div>
    );
  return (
    <div className="px-4 py-10">
      <BrandsGalery brandsData={brandsData} />
    </div>
  );
}

export default BrandPage;
