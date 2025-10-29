import extress from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as favoriteController from '../controllers/favoriteControler.js';

const {
  getProductsFromFavorite,
  addProductToFavorite,
  addProductFromFavToCart,
  deleteProductFromFavorite,
} = favoriteController;

const router = extress.Router();

router.post('/add', protect, addProductToFavorite);
router.post('/to-cart', protect, addProductFromFavToCart);
router.get('/get', protect, getProductsFromFavorite);
router.delete('/:id', protect, deleteProductFromFavorite);

export default router;
