import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout.jsx'
import HomePage from '../pages/HomePage.jsx'
import CartPage from '../pages/CartPage.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import ProductPage from '../pages/ProductPage.jsx'
import CheckoutPage from '../pages/CheckoutPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import SignupPage from '../pages/SignupPage.jsx'
import BrandPage from '../pages/BrandPage.jsx'
import BrandDetailsPage from '../pages/BrandDetailsPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import SearchPage from '../pages/SearchPage.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/brands" element={<BrandPage />} />
        <Route path="/brand/:brandName" element={<BrandDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
