import { Link } from 'react-router-dom';
import { useFetchProducts } from '../hooks/useFetchProducts.js';
import HeroSection from '../components/HeroSection.jsx';
import ProdutCrd from '../components/ProductCard.jsx';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();
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

  if (loading) return <p className="p-4">{t('home.productsLoading')}</p>;

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        {t('common.errorLoadingProduct')}
      </div>
    );

  return (
    <div className="space-y-10 md:space-y-12">
      <HeroSection />
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {t('home.featuredBrands')}
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {previewBrands.map((brand) => (
            <ProdutCrd key={brand._id} product={brand} />
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link
            to="/brands"
            className="text-base font-semibold text-sky-700 transition-colors hover:text-sky-600 dark:text-sky-300"
          >
            {t('home.viewAllBrands')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
