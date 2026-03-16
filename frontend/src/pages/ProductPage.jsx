import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProducts } from '../hooks/useFetchProducts.js';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCartFav } from '../hooks/useCartFav.js';
import ImageCarousel from '../components/ImageCarousel.jsx';
import ReviewProduct from '../components/ReviewProduct.jsx';
import {
  Spinner,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from '@heroui/react';
import { useTranslation } from 'react-i18next';

function ProductPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    carts,
    favorites,
    addToCart,
    removeFromCartByProductId,
    removeFromFavoritesByProductId,
    addToFavorites
  } = useCartFav();
  const { data: product, loading, error } = useFetchProducts('id', id);

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

  if (!product || Array.isArray(product))
    return (
      <p className="py-10 text-center text-red-500">{t('product.notFound')}</p>
    );

  const { title, description, price, images } = product;
  const imagesArr = Array.isArray(images) ? images : [images];
  const isInCart = carts.some((item) => item.product._id === id);
  const isInFavorites = favorites.some((item) => item.product._id === id);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <Button
        onPress={handleGoBack}
        variant="light"
        className="w-fit rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
        startContent={<ArrowLeft className="h-4 w-4" />}
      >
        {t('common.goBack')}
      </Button>

      <Card className="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <CardHeader className="grid w-full grid-cols-1 items-start gap-6 p-0 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/60">
            <ImageCarousel srcArray={imagesArr} />
          </div>

          <div className="space-y-4 pt-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              {title}
            </h1>

            <span className="inline-flex rounded-full bg-sky-100 px-4 py-1.5 text-xl font-bold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
              ${price}
            </span>

            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {isInCart ? (
                <Button
                  onPress={() => removeFromCartByProductId(product._id)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  title={t('product.addToCart')}
                  onPress={() => addToCart(product)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-300"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              )}

              <Button
                title={t('product.addToFavorites')}
                onPress={
                  isInFavorites
                    ? () => removeFromFavoritesByProductId(product._id)
                    : () => addToFavorites(product)
                }
                className={`rounded-xl px-4 py-2 text-white shadow-sm transition-colors ${
                  isInFavorites
                    ? 'bg-pink-600 hover:bg-pink-700'
                    : 'bg-slate-900 hover:bg-sky-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-300'
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isInFavorites ? 'currentColor' : 'none'}
                />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardBody className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/50">
          <ReviewProduct productId={id} />
        </CardBody>
        <CardFooter className="p-0" />
      </Card>
    </div>
  );
}

export default ProductPage;
