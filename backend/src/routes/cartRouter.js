import extress from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as cartController from '../controllers/cartControler.js';

const {
  getProductsFromCart,
  addProductToCart,
  clearProductsFromCart,
  deleteProductFromCart,
} = cartController;

const router = extress.Router();

router.post('/add', protect, addProductToCart);
router.get('/get', protect, getProductsFromCart);
router.delete('/cart', protect, clearProductsFromCart);
router.delete('/:id', protect, deleteProductFromCart);

export default router;
