import { useParams } from 'react-router-dom';
import { useFetchProducts } from '../hooks/useFetchProducts.js';
import ProductCard from '../components/ProductCard.jsx';
import MotionDiv from '../components/MotionDiv.jsx';
import { Spinner } from '@heroui/react';
import { useTranslation } from 'react-i18next';

function BrandDetailsPage() {
  const { t } = useTranslation();
  const { brandName } = useParams();
  const {
    data: products,
    loading,
    error
  } = useFetchProducts('brand', brandName);

  const description =
    t(`brands.descriptions.${brandName}`, {
      defaultValue: t('brands.descriptions.default', { brandName }),
      brandName
    }) || t('brands.descriptions.default', { brandName });

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
    <>
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
        {description}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          {t('brands.noProductsForBrand', { brandName })}
        </p>
      ) : (
        <MotionDiv>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </MotionDiv>
      )}
    </>
  );
}
export default BrandDetailsPage;
