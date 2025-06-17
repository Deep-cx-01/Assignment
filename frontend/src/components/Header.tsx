import React from 'react';
import { Star, ShoppingBag, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="glass-effect sticky top-0 z-40 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-purple-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="w-7 h-7 text-white fill-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">ReviewHub</h1>
              <p className="text-sm text-gray-600 font-medium">Discover • Review • Share</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Products</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Categories</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Reviews</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="relative p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 group">
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-semibold group-hover:scale-110 transition-transform">
                  3
                </span>
              </button>
              
              <button className="btn-primary btn-hover-effect">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};