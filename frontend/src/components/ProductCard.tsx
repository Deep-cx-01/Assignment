import React from 'react';
import { Product } from '../types';
import { StarRating } from './StarRating';
import { MessageCircle, Tag, TrendingUp, Award } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const topTags = product.reviews
    .flatMap(review => review.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const sortedTags = Object.entries(topTags)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([tag]) => tag);

  const isHighRated = product.averageRating >= 4.5;
  const isPopular = product.totalReviews >= 100;

  return (
    <div 
      className="product-card relative cursor-pointer group overflow-hidden animate-fade-in"
      onClick={() => onProductClick(product)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isHighRated && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            <Award className="w-3 h-3" />
            Top Rated
          </div>
        )}
        {isPopular && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            <TrendingUp className="w-3 h-3" />
            Popular
          </div>
        )}
      </div>

      {/* Price Badge */}
      <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
        <span className="text-lg font-bold text-gray-900">${product.price}</span>
      </div>
      
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StarRating rating={product.averageRating} size="sm" />
            <span className="text-sm font-semibold text-gray-700">
              {product.averageRating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">{product.totalReviews}</span>
          </div>
        </div>
        
        {sortedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {sortedTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-50 to-purple-50 text-primary-700 text-xs font-medium rounded-full border border-primary-100"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-gray-100">
          <button className="w-full btn-primary text-sm py-2.5 btn-hover-effect">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};