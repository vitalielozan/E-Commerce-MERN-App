/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { CartFavContext } from './context.js';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext.js';
import axiosInstance from '../services/axiosInstance.js';
import { API_PATHS } from '../services/apiPaths.js';
import { useTranslation } from 'react-i18next';

function CartFavProvider({ children }) {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [carts, setCarts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchCardProducts = async () => {
    if (!user) return;
    try {
      const response = await axiosInstance.get(
        API_PATHS.CART.GET_ALL_FROM_CART
      );
      setCarts(response.data);
    } catch (error) {
      console.error('Eroar fetchCardProducts:', error.message);
      throw error;
    }
  };
  const fetchFavProducts = async () => {
    if (!user) return;
    try {
      const response = await axiosInstance.get(
        API_PATHS.FAVORITE.GET_ALL_FROM_FAVORITE
      );
      setFavorites(response.data);
    } catch (error) {
      console.error('Error by fetch Favorite Products:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchCardProducts();
    fetchFavProducts();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) {
      toast.warning(t('notifications.loginForCart'));
      return;
    }
    if (!product || !product._id) {
      toast.error(t('notifications.invalidProduct'));
      return;
    }
    if (carts.some((item) => item._id === product._id)) {
      toast.warning(t('notifications.productInCart'));
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.CART.ADD_TO_CART, {
        productId: product._id
      });
      toast.success(t('notifications.addedToCart'));
      fetchCardProducts();
    } catch (error) {
      console.error('Error adding to card:', error.message);
      toast.error(t('notifications.failedAddToCart'));
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete(API_PATHS.CART.DELETE_FROM_CART(productId));
      toast.success(t('notifications.removedFromCart'));
      fetchCardProducts();
    } catch (error) {
      console.error('Error removing from card:', error.message);
      toast.error(t('notifications.failedRemoveFromCart'));
    }
  };
  const removeFromCartByProductId = async (productId) => {
    const cart = carts.find((c) => c.product._id === productId);
    if (!cart) return;
    try {
      await axiosInstance.delete(API_PATHS.CART.DELETE_FROM_CART(cart._id));
      setCarts((prev) => prev.filter((c) => c._id !== cart._id));
    } catch (error) {
      console.error('Failed to remove cart', error);
    }
  };

  const addToFavorites = async (product) => {
    if (!user) {
      toast.warning(t('notifications.loginForCart'));
      return;
    }

    if (!product || !product._id) {
      toast.error(t('notifications.invalidProduct'));
      return;
    }
    if (favorites.some((item) => item.id === product._id)) {
      toast.warning(t('notifications.productInFavorites'));
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.FAVORITE.ADD_TO_FAVORITE, {
        productId: product._id
      });
      toast.success(t('notifications.addedToFavorites'));
      fetchFavProducts();
    } catch (error) {
      console.error('Error adding to favorite:', error.message);
      toast.error(t('notifications.failedAddToFavorite'));
    }
  };

  const addFromFavoriteToCart = async (productId) => {
    try {
      await axiosInstance.post(API_PATHS.FAVORITE.ADD_TO_CART_FROM_FAV, {
        productId
      });
      toast.success(t('notifications.addedToCartFromFavorite'));
      fetchCardProducts();
    } catch (error) {
      toast.error(t('notifications.failedAddFromFavorite'));
      console.error('Add from fav to cart error', error.message);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      await axiosInstance.delete(
        API_PATHS.FAVORITE.DELETE_FROM_FAVORITE(productId)
      );
      toast.success(t('notifications.removedFromFavorite'));
      fetchFavProducts();
    } catch (error) {
      console.error('Error removing from favorite:', error.message);
      toast.error(t('notifications.failedRemoveFromFavorite'));
    }
  };

  const removeFromFavoritesByProductId = async (productId) => {
    const favorite = favorites.find((fav) => fav.product._id === productId);
    if (!favorite) return;
    try {
      await axiosInstance.delete(
        API_PATHS.FAVORITE.DELETE_FROM_FAVORITE(favorite._id)
      );
      setFavorites((prev) => prev.filter((fav) => fav._id !== favorite._id));
    } catch (error) {
      console.error('Failed to remove favrite', error);
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete(API_PATHS.CART.CLEAR_CART);
      setCarts([]);
      toast.success(t('notifications.cartCleared'));
    } catch (error) {
      console.error('Error clearing cart:', error.message);
      toast.error(t('notifications.failedClearCart'));
    }
  };

  return (
    <CartFavContext.Provider
      value={{
        carts,
        favorites,
        addToCart,
        clearCart,
        removeFromCart,
        removeFromCartByProductId,
        addToFavorites,
        addFromFavoriteToCart,
        removeFromFavorites,
        removeFromFavoritesByProductId
      }}
    >
      {children}
    </CartFavContext.Provider>
  );
}

export default CartFavProvider;
