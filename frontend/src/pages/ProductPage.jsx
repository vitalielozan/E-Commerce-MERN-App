import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProducts } from '../hooks/useFetchProducts.js';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCartFav } from '../hooks/useCartFav.js';
import ImageCarousel from '../components/ImageCarousel.jsx';
import ReviewProduct from '../components/ReviewProduct.jsx';
import {
  Spinner,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image
} from '@heroui/react';
import { API_PATHS } from '../services/apiPaths.js';

function ProductPage() {
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
          label="Loading..."
          labelColor="primary"
        />
      </div>
    );

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading product.
      </div>
    );

  if (!product || Array.isArray(product))
    return <p className="py-10 text-center text-red-500">Product not found.</p>;

  const { title, description, price, images } = product;
  const imagesArr = Array.isArray(images) ? images : [images];
  const isInCart = carts.some((item) => item.product._id === id);
  const isInFavorites = favorites.some((item) => item.product._id === id);

  return (
    <Card className="mx-auto max-w-2xl rounded-2xl bg-white/80 px-6 py-10 shadow-2xl dark:bg-gray-900/80 sm:px-8 lg:px-10">
      <CardHeader className="flex flex-col items-center justify-center gap-4">
        <ImageCarousel srcArray={imagesArr} />
        <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-justify text-lg text-gray-500 dark:text-gray-300">
          {description}
        </p>
      </CardHeader>
      <CardBody className="flex flex-col items-center gap-6">
        <ReviewProduct productId={id} />
        <span className="text-2xl font-bold text-indigo-600">${price}</span>
      </CardBody>
      <CardFooter className="justify-around">
        {isInCart ? (
          <Button
            onPress={() => removeFromCartByProductId(product._id)}
            className="rounded-full bg-red-600 px-4 py-2 text-white shadow hover:scale-105"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            title="Add to cart"
            onPress={() => addToCart(product)}
            className="rounded-full bg-gray-900 px-4 py-2 text-white shadow hover:scale-105"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        )}

        <Button
          title="Add to favorites"
          onPress={
            isInFavorites
              ? () => removeFromFavoritesByProductId(product._id)
              : () => addToFavorites(product)
          }
          className={`rounded-full px-4 py-2 text-white shadow hover:scale-105 ${
            isInFavorites ? 'bg-pink-600' : 'bg-gray-900'
          }`}
        >
          <Heart
            className="h-5 w-5"
            fill={isInFavorites ? 'currentColor' : 'none'}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductPage;
