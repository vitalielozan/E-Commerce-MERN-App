import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts.js';
import ProductCard from '../components/ProductCard.jsx';
import MotionDiv from '../components/MotionDiv.jsx';
import { Spinner } from '@heroui/react';

function SearchPage() {
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
          label="Loading..."
          labelColor="primary"
        />
      </div>
    );
  }

  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex flex-col">
        <h2 className="mb-4 text-center text-xl font-semibold">
          Result for: <span className="text-blue-600">"{query}"</span>
        </h2>

        <div className="mb-4">
          <label className="mb-1 block font-medium">Sort by price:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-lg border px-3 py-2"
          >
            <option value="default">Default</option>
            <option value="priceAsc">Ascending price</option>
            <option value="priceDesc">Descending price</option>
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
        <p className="text-gray-500">.</p>
      )}
    </div>
  );
}

export default SearchPage;
