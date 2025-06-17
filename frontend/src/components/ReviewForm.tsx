import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { NewReview } from '../types';
import { Send } from 'lucide-react';

interface ReviewFormProps {
  productId: string;
  onSubmitReview: (review: NewReview) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ 
  onSubmitReview, 
  onCancel,
  loading = false 
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    const newReview: NewReview = {
      id: '', // Will be set by the backend
      rating,
      comment: comment.trim(),
      user: { id: '', username: 'Current User' }, // Will be set by the backend
      createdAt: new Date().toISOString(),
      tags: tags.length > 0 ? tags : [],
      helpful: 0
    };
    
    onSubmitReview(newReview);
    
    // Reset form
    setRating(0);
    setComment('');
    setTags([]);
  };

  const isValid = rating > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Rating *
          </label>
          <div className="flex items-center gap-3">
            <StarRating
              rating={rating}
              interactive
              onRatingChange={setRating}
              size="lg"
            />
            <span className="text-sm text-gray-600">
              {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select a rating'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            placeholder="Share your experience with this product..."
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1">
            {comment.length}/1000 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (optional)
          </label>
          <input
            type="text"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Add tags separated by commas (e.g., quality, value, design)"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid || loading}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};