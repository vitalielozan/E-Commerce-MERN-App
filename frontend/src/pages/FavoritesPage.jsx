import React, { useEffect } from 'react';
import MotionDiv from '../components/MotionDiv.jsx';
import EmptyMasage from '../components/EmptyMasage.jsx';
import { messages } from '../constants/constants.js';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartFav } from '../hooks/useCartFav.js';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { toast } from 'react-toastify';
import { useUserAuth } from '../hooks/useUserAuth.js';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image
} from '@heroui/react';

function FavoritesPage() {
  useUserAuth();
  const navigate = useNavigate();
  const { carts, favorites, addFromFavoriteToCart, removeFromFavorites } =
    useCartFav();
  const { user, isLoading } = useAuthContext();
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [navigate, user, isLoading]);

  const handleAddToCartFromFavorite = (product) => {
    if (carts.some((item) => item.product._id === product._id)) {
      toast.warning('Product already in cart!');
      return;
    }
    addFromFavoriteToCart(product._id);
  };
  return (
    <div className="p-3 text-center">
      <h1 className="mb-6 text-4xl font-bold">Your favorite products</h1>
      {favorites.length === 0 ? (
        <EmptyMasage imageSrc="/favorite.png" message={messages.messageFav} />
      ) : (
        <MotionDiv>
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((item) => {
              return (
                <Card
                  key={item.product._id}
                  className="w-full bg-white/80 shadow-xl transition-shadow duration-200 hover:shadow-2xl dark:bg-gray-900/80"
                >
                  <Link to={`/products/${item.product._id}`}>
                    <CardHeader className="cursor-pointer p-0">
                      <Image
                        isZoomed
                        src={item.product.image}
                        alt={item.product.title}
                        className="mx-auto h-48 w-full rounded-t object-cover px-10"
                      />
                    </CardHeader>
                  </Link>
                  <CardBody className="space-y-2 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.product.shortDesc}
                    </p>
                    <p className="text-md font-bold text-indigo-600">
                      ${item.product.price}
                    </p>
                  </CardBody>
                  <CardFooter className="justify-around">
                    <Button
                      onPress={() => handleAddToCartFromFavorite(item.product)}
                      className="rounded-full bg-gray-900 px-4 py-2 text-white shadow hover:scale-105"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                    <Button
                      onPress={() => removeFromFavorites(item._id)}
                      className="rounded-full bg-red-600 px-4 py-2 text-white shadow hover:scale-105"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </MotionDiv>
      )}
    </div>
  );
}

export default FavoritesPage;
