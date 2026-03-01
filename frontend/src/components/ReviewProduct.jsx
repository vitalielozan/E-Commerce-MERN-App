import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { Star as StarIcon, Trash2 } from 'lucide-react';
import { Button, Form } from '@heroui/react';
import { Textarea } from '@heroui/input';
import { maskEmail } from '../services/helper.js';
import axiosInstance from '../services/axiosInstance.js';
import { API_PATHS } from '../services/apiPaths.js';
import { useTranslation } from 'react-i18next';

function ReviewProduct({ productId }) {
  const { t } = useTranslation();
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
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {t('reviews.title')}
      </h2>

      {user ? (
        <Form
          onSubmit={handleSubmit}
          className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('reviews.writeComment')}
            required
            variant="faded"
            className="w-full"
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
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {t('reviews.stars', { count: rating })}
            </span>
          </div>

          {!myReview ? (
            <Button
              type="submit"
              className="rounded-xl bg-slate-900 px-8 py-3 text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-300"
              fullWidth
            >
              {t('reviews.send')}
            </Button>
          ) : (
            <Button
              className="my-2 rounded-xl bg-red-600 px-8 py-3 text-white shadow-sm transition-colors hover:bg-red-700"
              fullWidth
              onPress={() => handleRemovereview(myReview._id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </Form>
      ) : (
        <p className="mb-4 text-base text-slate-500 italic dark:text-slate-400">
          {t('reviews.mustLogin')}
        </p>
      )}

      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-500 italic">{t('reviews.loading')}</p>
        ) : reviews.length === 0 ? (
          <p className="text-base text-slate-400 italic dark:text-slate-500">
            {t('reviews.empty')}
          </p>
        ) : (
          reviews.map((review, indx) => (
            <div
              key={indx}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="me-2 font-semibold text-slate-800 dark:text-slate-100">
                  {typeof review?.user?.email === 'string'
                    ? maskEmail(review.user.email)
                    : t('common.anonymous')}
                </span>
                <span className="text-sm text-slate-400 dark:text-slate-500">
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
              <p className="text-slate-700 dark:text-slate-300">
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
