import express from 'express';
import {
  getAllProducts,
  getProductByBrand,
  getProductById,
  getRawProducts,
} from '../controllers/productContruller.js';

const router = express.Router();

router.get('/get', getAllProducts);
router.get('/brand/:brand', getProductByBrand);
router.get('/raw', getRawProducts);
router.get('/:id', getProductById);

export default router;
