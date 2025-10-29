import express from 'express';
import * as reviewControler from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
const { addReview, getReviewsForProduct, deleteReview } = reviewControler;

const router = express.Router();

router.post('/add', protect, addReview);
router.get('/:productId', getReviewsForProduct);
router.delete('/:reviewId', protect, deleteReview);

export default router;
