export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export interface User {
  id: string;
  username: string;
}

export interface Review {
  id: string;
  userId: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  helpful: number;
  tags: string[];
  images?: string[];
}

export interface NewReview {
  id: string;
  rating: number;
  comment: string;
  user: User;
  createdAt: string;
  tags: string[];
  helpful: number;
}

export interface ReviewResponse {
  reviews: Review[];
  total: number;
  totalPages: number;
  currentPage: number;
}