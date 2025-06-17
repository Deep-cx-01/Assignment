import { Product } from '../types';

export const products: Product[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    averageRating: 4.5,
    totalReviews: 128,
    reviews: [
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        userId: '1',
        user: { id: '1', username: 'Sarah Johnson' },
        rating: 5,
        comment: 'Absolutely amazing sound quality! The noise cancellation works perfectly and the battery lasts all day.',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        helpful: 24,
        tags: ['sound quality', 'battery life', 'comfortable'],
        images: []
      },
      {
        id: 'b2c3d4e5-f678-90ab-cdef-234567890abc',
        userId: '2',
        user: { id: '2', username: 'Mike Chen' },
        rating: 4,
        comment: 'Great headphones overall. The build quality is solid and they\'re very comfortable for long listening sessions.',
        createdAt: '2024-01-10T14:30:00Z',
        updatedAt: '2024-01-10T14:30:00Z',
        helpful: 18,
        tags: ['comfortable', 'build quality'],
        images: []
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Wearables',
    averageRating: 4.2,
    totalReviews: 89,
    reviews: [
      {
        id: 'c3d4e5f6-7890-abcd-ef12-34567890abcd',
        userId: '4',
        user: { id: '4', username: 'Alex Rodriguez' },
        rating: 4,
        comment: 'Excellent fitness tracking features. The GPS is accurate and the heart rate monitor works well during workouts.',
        createdAt: '2024-01-12T11:20:00Z',
        updatedAt: '2024-01-12T11:20:00Z',
        helpful: 15,
        tags: ['fitness tracking', 'GPS', 'accurate'],
        images: []
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable cotton t-shirt for everyday wear.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1521572163474-6864f9cf17ab?w=400',
    category: 'Clothing',
    averageRating: 4.7,
    totalReviews: 567,
    reviews: []
  }
];