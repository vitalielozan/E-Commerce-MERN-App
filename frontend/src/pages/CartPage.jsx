import React, { useEffect } from 'react';
import EmptyMasage from '../components/EmptyMasage.jsx';
import { messages } from '../constants/constants.js';
import MotionDiv from '../components/MotionDiv.jsx';
import { Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartFav } from '../hooks/useCartFav.js';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useUserAuth } from '../hooks/useUserAuth.js';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image
} from '@heroui/react';
function CartPage() {
  useUserAuth();
  const navigate = useNavigate();
  const { carts, removeFromCart } = useCartFav();
  const total = carts.reduce((acc, item) => acc + item.product.price, 0);
  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [navigate, user, isLoading]);

  return (
    <div className="p-3 text-center">
      <h1 className="mb-6 text-4xl font-bold">Shopping cart</h1>
      {carts.length === 0 ? (
        <EmptyMasage
          imageSrc="/shopping-bag.png"
          message={messages.messageCart}
        />
      ) : (
        <MotionDiv>
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {carts.map((item, index) => {
              return (
                <Card
                  key={index}
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
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="rounded-full bg-red-600 px-4 py-2 text-white shadow hover:scale-105"
                      onPress={() => removeFromCart(item._id)}
                      fullWidth
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 space-y-4 text-center">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-500">
              Total :
              <span className="text-indigo-600">${total.toFixed(2)}</span>
            </p>
            <Button
              className="rounded bg-green-600 px-6 py-2 text-lg font-medium text-white shadow hover:scale-105"
              onPress={() => navigate('/checkout')}
            >
              Proceed to checkout
            </Button>
          </div>
        </MotionDiv>
      )}
    </div>
  );
}

export default CartPage;
