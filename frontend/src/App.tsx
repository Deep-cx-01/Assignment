import { useState, useMemo, useEffect } from 'react';
import { Product, NewReview, Review } from './types';
import { products as initialProducts } from './data/products';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { Search, Sparkles, TrendingUp } from 'lucide-react';
import { reviewApi } from './services/api';
import { authService } from './services/auth';

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Initialize authentication
  useEffect(() => {
    authService.autoLogin();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category))).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const ratingMatch = product.averageRating >= minRating;
      const searchMatch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && ratingMatch && searchMatch;
    });
  }, [products, selectedCategory, minRating, searchQuery]);

  // Fetch reviews for a product from backend
  const fetchProductReviews = async (product: Product) => {
    setReviewsLoading(true);
    setError(null);
    try {
      const reviewsResponse = await reviewApi.getProductReviews(product.id);
      const updatedProduct = {
        ...product,
        reviews: reviewsResponse.reviews || []
      };
      setSelectedProduct(updatedProduct);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load reviews. Please try again.');
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    fetchProductReviews(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setError(null);
  };

  // Add review using backend, then fetch latest reviews
  const handleAddReview = async (productId: string, newReview: NewReview) => {
    setLoading(true);
    setError(null);
    try {
      await reviewApi.createReview(productId, {
        rating: newReview.rating,
        comment: newReview.comment,
        tags: newReview.tags || [],
        images: []
      });
      // Fetch latest reviews after adding
      if (selectedProduct) {
        await fetchProductReviews(selectedProduct);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update review using backend, then fetch latest reviews
  const handleUpdateReview = async (reviewId: string, updatedReview: Partial<NewReview>) => {
    setLoading(true);
    setError(null);
    try {
      await reviewApi.updateReview(reviewId, {
        rating: updatedReview.rating!,
        comment: updatedReview.comment!,
        tags: updatedReview.tags || [],
        images: []
      });
      if (selectedProduct) {
        await fetchProductReviews(selectedProduct);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete review using backend, then fetch latest reviews
  const handleDeleteReview = async (reviewId: string) => {
    setLoading(true);
    setError(null);
    try {
      await reviewApi.deleteReview(reviewId);
      if (selectedProduct) {
        await fetchProductReviews(selectedProduct);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const topRatedProducts = products.filter(p => p.averageRating >= 4.5).length;
  const totalReviews = products.reduce((sum, p) => sum + p.totalReviews, 0);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-accent-500" />
            <h1 className="text-5xl font-bold gradient-text">Discover Amazing Products</h1>
            <Sparkles className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of premium products with authentic reviews from real customers. 
            Make informed decisions with confidence.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{products.length}</div>
              <div className="text-sm text-gray-600 font-medium">Products</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600">{totalReviews}</div>
              <div className="text-sm text-gray-600 font-medium">Reviews</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{topRatedProducts}</div>
              <div className="text-sm text-gray-600 font-medium">Top Rated</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, categories, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          minRating={minRating}
          onMinRatingChange={setMinRating}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in"
            >
              <ProductCard
                product={product}
                onProductClick={handleProductClick}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setMinRating(0);
                setSearchQuery('');
              }}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Trending Section */}
        {filteredProducts.length > 0 && (
          <div className="mt-16 animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-accent-500" />
              <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products
                .filter(p => p.totalReviews >= 100)
                .slice(0, 3)
                .map((product, index) => (
                  <div
                    key={`trending-${product.id}`}
                    className="glass-effect rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.averageRating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({product.totalReviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddReview={handleAddReview}
          onUpdateReview={handleUpdateReview}
          onDeleteReview={handleDeleteReview}
          loading={loading}
          reviewsLoading={reviewsLoading}
          error={error}
        />
      )}
    </div>
  );
}

export default App;