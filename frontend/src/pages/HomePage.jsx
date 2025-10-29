import { Link } from 'react-router-dom';
import { useFetchProducts } from '../hooks/useFetchProducts.js';
import HeroSection from '../components/HeroSection.jsx';
import ProdutCrd from '../components/ProductCard.jsx';

function HomePage() {
  const { data: brandsData, loading, error } = useFetchProducts('raw');
  const shuffled = [...brandsData].sort(() => 0.5 - Math.random());
  const previewBrands = [];
  const seenBrands = new Set();
  for (const product of shuffled) {
    if (!seenBrands.has(product.brand)) {
      previewBrands.push(product);
      seenBrands.add(product.brand);
    }
    if (previewBrands.length === 4) break;
  }

  if (loading) return <p className="p-4">Products loading...</p>;

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading product.
      </div>
    );

  return (
    <div className="space-y-12">
      <HeroSection />
      <section className="px-6">
        <h2 className="mb-4 text-2xl font-semibold">Featured Brands</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {previewBrands.map((brand) => (
            <ProdutCrd key={brand._id} product={brand} />
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link
            to="/brands"
            className="mx-5 mb-8 text-2xl font-semibold text-gray-900 hover:underline dark:text-white"
          >
            View all Brands
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
