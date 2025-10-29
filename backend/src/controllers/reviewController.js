import Review from '../models/Review.js';
import mongoose from 'mongoose';

// add review
export async function addReview(req, res) {
  const userId = req.user._id;
  const { productId, comment, rating } = req.body;
  try {
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: 'Invalid product Id' });
    }
    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: 'You alredy reviewd this product' });
    }
    const review = new Review({
      product: productId,
      user: userId,
      comment,
      rating,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

// get review for product
export async function getReviewsForProduct(req, res) {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({ product: productId })
      .populate('user', 'email fullName')
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

// delete review
export async function deleteReview(req, res) {
  const { reviewId } = req.params;
  const userId = req.user.id;
  try {
    const review = await Review.findById(reviewId);
    if (!reviewId) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not allowed to delete this review' });
    }
    const deletedReview = await Review.findByIdAndDelete(review);
    res
      .status(200)
      .json({ message: 'Review deleted successfully', deletedReview });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}
