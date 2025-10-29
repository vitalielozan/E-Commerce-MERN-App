import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { Star as StarIcon, Trash2 } from 'lucide-react';
import { Button, Form } from '@heroui/react';
import { Textarea } from '@heroui/input';
import { maskEmail } from '../services/helper.js';
import axiosInstance from '../services/axiosInstance.js';
import { API_PATHS } from '../services/apiPaths.js';

function ReviewProduct({ productId }) {
  const { user } = useAuthContext();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.REVIEWS.GET_REVIEW(productId)
        );
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const newReview = {
      productId,
      comment,
      rating
    };
    try {
      const response = await axiosInstance.post(
        API_PATHS.REVIEWS.ADD_REVIEW,
        newReview
      );
      const savedReview = response.data;
      setReviews((prev) => [savedReview, ...prev]);
      setComment('');
      setRating(5);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const myReview = reviews.find((r) => r.user._id === user._id);

  const handleRemovereview = async (reviewId) => {
    try {
      await axiosInstance.delete(API_PATHS.REVIEWS.DELETE_REVIEW(reviewId));
      const response = await axiosInstance.get(
        API_PATHS.REVIEWS.GET_REVIEW(productId)
      );
      setReviews(response.data);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Reviews
      </h2>

      {user ? (
        <Form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            required
            variant="faded"
            className="w-full max-w-md"
          />

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-6 w-6 cursor-pointer transition-colors ${
                  star <= rating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {rating} stars
            </span>
          </div>

          {!myReview ? (
            <Button
              type="submit"
              className="rounded-lg bg-gray-950 from-cyan-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-gradient-to-r"
              fullWidth
            >
              Send Review
            </Button>
          ) : (
            <Button
              className="my-3 rounded-lg bg-red-500 px-8 py-3 text-white shadow-lg transition-transform hover:scale-105"
              fullWidth
              onPress={() => handleRemovereview(myReview._id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </Form>
      ) : (
        <p className="mb-4 text-lg italic text-gray-500 dark:text-gray-400">
          I must be loged for reviews.
        </p>
      )}

      <div className="space-y-4">
        {loading ? (
          <p className="italic text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-lg italic text-gray-400 dark:text-gray-500">
            There are no reviews for this product.
          </p>
        ) : (
          reviews.map((review, indx) => (
            <div
              key={indx}
              className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-300 dark:bg-gray-800/50"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="me-2 font-semibold text-gray-800 dark:text-gray-100">
                  {typeof user?.email === 'string'
                    ? maskEmail(user?.email)
                    : 'Anonymus'}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-5 w-5 ${
                      star <= review.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewProduct;
