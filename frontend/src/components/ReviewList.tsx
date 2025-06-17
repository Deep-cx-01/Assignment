import React from 'react';
import { Review, NewReview } from '../types';
import { StarRating } from './StarRating';
import { ThumbsUp, Tag, Calendar, Edit, Trash2 } from 'lucide-react';

interface ReviewListProps {
  productId: string;
  reviews: Review[];
  onUpdateReview?: (reviewId: string, review: Partial<NewReview>) => void;
  onDeleteReview?: (reviewId: string) => void;
  loading?: boolean;
}

export const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews, 
  onUpdateReview,
  onDeleteReview,
  loading = false 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tag className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div 
          key={review.id} 
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                {review.user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{review.user.username}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {formatDate(review.createdAt)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} size="sm" />
              {(onUpdateReview || onDeleteReview) && (
                <div className="flex items-center gap-1">
                  {onUpdateReview && (
                    <button 
                      onClick={() => onUpdateReview(review.id, {
                        rating: review.rating,
                        comment: review.comment,
                        tags: review.tags
                      })}
                      className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                      title="Edit review"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {onDeleteReview && (
                    <button 
                      onClick={() => onDeleteReview(review.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {review.comment && (
            <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {review.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>{review.helpful}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};