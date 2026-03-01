import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts.js';
import ProductCard from '../components/ProductCard.jsx';
import MotionDiv from '../components/MotionDiv.jsx';
import { Spinner } from '@heroui/react';
import { useTranslation } from 'react-i18next';

function SearchPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const { data: allProducts, loading, error } = useFetchProducts('all');
  const [results, setResults] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    if (!query || !Array.isArray(allProducts)) {
      setResults([]);
      return;
    }

    let filtered = allProducts.filter((product) =>
      [product.title, product.shortDesc, product.description]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );

    if (sortOrder === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setResults(filtered);
  }, [query, allProducts, sortOrder]);

  if (loading) {
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
  }

  if (error)
    return (
      <p className="p-4 text-red-500">{t('common.errorLoadingProduct')}</p>
    );

  return (
    <div className="p-4">
      <div className="flex flex-col">
        <h2 className="mb-4 text-center text-xl font-semibold">
          {t('search.resultFor')}{' '}
          <span className="text-blue-600">"{query}"</span>
        </h2>

        <div className="mb-4">
          <label className="mb-1 block font-medium">
            {t('search.sortByPrice')}
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-lg border px-3 py-2"
          >
            <option value="default">{t('search.default')}</option>
            <option value="priceAsc">{t('search.asc')}</option>
            <option value="priceDesc">{t('search.desc')}</option>
          </select>
        </div>
      </div>

      {results.length > 0 ? (
        <MotionDiv>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </MotionDiv>
      ) : (
        <p className="text-gray-500">{t('search.noResults')}</p>
      )}
    </div>
  );
}

export default SearchPage;
