import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Review API calls
export const reviewApi = {
  // Create a new review
  createReview: async (productId: string, reviewData: {
    rating: number;
    comment: string;
    tags?: string[];
    images?: string[];
  }) => {
    const response = await api.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  },

  // Get reviews for a product
  getProductReviews: async (productId: string, page = 1, limit = 10, sort = 'createdAt') => {
    const response = await api.get(`/products/${productId}/reviews`, {
      params: { page, limit, sort },
    });
    return response.data;
  },

  // Update a review
  updateReview: async (reviewId: string, reviewData: {
    rating: number;
    comment: string;
    tags?: string[];
    images?: string[];
  }) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  // Delete a review
  deleteReview: async (reviewId: string) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  // Get popular tags for a product
  getPopularTags: async (productId: string) => {
    const response = await api.get(`/products/${productId}/tags`);
    return response.data;
  },
};

export default api; 