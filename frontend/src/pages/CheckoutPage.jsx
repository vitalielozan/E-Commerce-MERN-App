import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useCartFav } from '../hooks/useCartFav.js';
import { Form, Button } from '@heroui/react';
import { Input } from '@heroui/input';
import { useUserAuth } from '../hooks/useUserAuth.js';

const schema = yup.object().shape({
  billingAddress: yup.string().required('Billing address is required'),
  shippingAddress: yup.string().required('Shipping address is required'),
  cardNr: yup
    .string()
    .matches(/^[0-9]{16}$/, 'Invalid card number')
    .required('Card number is required')
});

function CheckoutPage() {
  useUserAuth();
  const { user, updateCheckOut, isLoading } = useAuthContext();
  const { carts, clearCart } = useCartFav();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (user?.lastCheckout) {
      reset(user.lastCheckout);
    }
  }, [user, reset]);

  useEffect(() => {
    if (!user && !isLoading) navigate('/login');
    else if (carts.length === 0) navigate('/cart');
  }, [user, carts, isLoading, navigate]);

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  const onSubmit = (data) => {
    updateCheckOut(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
      reset();
    }, 2000);
  };

  const total = carts.reduce((acc, item) => acc + item.product.price, 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h2 className="font-boldmb-6 mb-5 ms-2 text-3xl">Checkout</h2>
      {success ? (
        <div className="rounded-lg bg-green-100 p-4 text-center text-lg text-green-700 shadow">
          Payment successful! Redirecting to homepage...
        </div>
      ) : (
        <>
          <div className="mb-6 rounded-lg bg-white/80 p-4 shadow-sm dark:bg-gray-900/80">
            <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <ul className="divide-y divide-gray-200">
              {carts.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between py-2 text-sm"
                >
                  <span>{item.product.title}</span>
                  <span>{item.product.price} $.</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between text-base font-semibold">
              <span>Total : </span>
              <span>{total.toFixed(2)} $.</span>
            </div>
          </div>
          <Form
            className="space-y-6 rounded-lg bg-white/80 p-6 shadow dark:bg-slate-900/80"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Billding Address"
              labelPlacement="outside"
              type="text"
              variant="bordered"
              fullWidth
              {...register('billingAddress')}
              error={errors.billingAddress?.message}
            />

            <Input
              label="Shipping Address"
              labelPlacement="outside"
              type="text"
              variant="bordered"
              fullWidth
              {...register('shippingAddress')}
              error={errors.shippingAddress?.message}
            />

            <Input
              label="Card Number"
              labelPlacement="outside"
              type="text"
              variant="bordered"
              fullWidth
              {...register('cardNr')}
              error={errors.cardNr?.message}
            />

            <Button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
