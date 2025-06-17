import React, { useState } from 'react';
import { Product, NewReview } from '../types';
import { StarRating } from './StarRating';
import { ReviewList } from './ReviewList';
import { ReviewForm } from './ReviewForm';
import { X, Star, MessageCircle, Plus, ShoppingCart, AlertCircle } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddReview: (productId: string, review: NewReview) => void;
  onUpdateReview: (reviewId: string, review: Partial<NewReview>) => void;
  onDeleteReview: (reviewId: string) => void;
  loading: boolean;
  reviewsLoading: boolean;
  error: string | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  onClose, 
  onAddReview, 
  onUpdateReview,
  onDeleteReview,
  loading,
  reviewsLoading,
  error
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleAddReview = (review: NewReview) => {
    onAddReview(product.id, review);
    setShowReviewForm(false);
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = product.reviews.filter(review => review.rating === rating).length;
    const percentage = product.totalReviews > 0 ? (count / product.totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary-600">${product.price}</span>
                  <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>

              <div>
                <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <StarRating rating={product.averageRating} size="lg" />
                      <span className="text-2xl font-bold text-gray-900">
                        {product.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                      <span>{product.totalReviews} reviews</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                      <div key={rating} className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1 w-12">
                          <span>{rating}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-gray-600 w-8">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                {!showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    disabled={loading}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    Write Review
                  </button>
                )}
              </div>

              {showReviewForm && (
                <div className="mb-8">
                  <ReviewForm
                    productId={product.id}
                    onSubmitReview={handleAddReview}
                    onCancel={() => setShowReviewForm(false)}
                    loading={loading}
                  />
                </div>
              )}

              <ReviewList 
                productId={product.id} 
                reviews={product.reviews}
                onUpdateReview={onUpdateReview}
                onDeleteReview={onDeleteReview}
                loading={reviewsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};