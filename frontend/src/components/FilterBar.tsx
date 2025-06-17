import React from 'react';
import { Filter, Star, Sparkles } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  minRating,
  onMinRatingChange
}) => {
  return (
    <div className="glass-effect rounded-2xl shadow-lg border border-white/20 p-6 mb-8 animate-slide-down">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Filter Products</h3>
        <Sparkles className="w-5 h-5 text-accent-500" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 font-medium"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Minimum Rating
          </label>
          <div className="flex items-center gap-3">
            <select
              value={minRating}
              onChange={(e) => onMinRatingChange(Number(e.target.value))}
              className="flex-1 px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 font-medium"
            >
              <option value={0}>Any Rating</option>
              <option value={1}>1+ Stars</option>
              <option value={2}>2+ Stars</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={5}>5 Stars Only</option>
            </select>
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};