# Product Review System

A full-stack product review system built with React (frontend) and Express.js (backend) with TypeScript.

## Features

- **Product Catalog**: Browse products with filtering and search
- **Review System**: Create, read, update, and delete product reviews
- **Rating System**: 5-star rating with detailed rating distribution
- **Tag System**: Add tags to reviews for better categorization
- **Authentication**: JWT-based authentication system
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Instant UI updates when reviews are modified

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons

### Backend
- Express.js with TypeScript
- Sequelize ORM with PostgreSQL
- JWT authentication
- Express Validator for input validation
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Assignment
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up the database**
   - Create a PostgreSQL database
   - Update the database configuration in `backend/src/config/database.ts`

4. **Set up environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database
   JWT_SECRET=your_jwt_secret_key
   ```

## Running the Application

### Development Mode (Recommended)

Run both backend and frontend simultaneously:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:5173`

### Running Separately

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
npm run dev:frontend
```

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Reviews
- `POST /api/products/:productId/reviews` - Create a new review
- `GET /api/products/:productId/reviews` - Get reviews for a product
- `PUT /api/reviews/:reviewId` - Update a review
- `DELETE /api/reviews/:reviewId` - Delete a review
- `GET /api/products/:productId/tags` - Get popular tags for a product

### Authentication
All review creation, update, and delete operations require authentication via JWT token.

## Project Structure

```
Assignment/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Sequelize models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── config/          # Configuration files
│   │   └── app.ts           # Main application file
│   └── package.json
├── Frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript type definitions
│   │   ├── data/            # Mock data
│   │   └── App.tsx          # Main application component
│   └── package.json
└── package.json             # Root package.json for scripts
```

## Key Features Implementation

### Frontend-Backend Integration

1. **API Service Layer**: Centralized API calls using Axios with interceptors for authentication
2. **Error Handling**: Comprehensive error handling with user-friendly messages
3. **Loading States**: Loading indicators for better UX
4. **Real-time Updates**: UI updates immediately after API operations
5. **Authentication**: Automatic token management and user session handling

### Review System

- **Create Reviews**: Users can submit reviews with ratings, comments, and tags
- **View Reviews**: Display reviews with user information, ratings, and helpful votes
- **Edit Reviews**: Users can update their own reviews
- **Delete Reviews**: Users can remove their reviews
- **Rating Distribution**: Visual representation of rating distribution

### Product Management

- **Product Catalog**: Display products with images, descriptions, and ratings
- **Filtering**: Filter by category and minimum rating
- **Search**: Search products by name, description, or category
- **Product Details**: Detailed product view with reviews

## Development Notes

### Authentication
The current implementation uses a mock authentication service for demonstration purposes. In production, you would:

1. Implement proper user registration/login endpoints
2. Use secure password hashing (bcrypt)
3. Implement proper JWT token validation
4. Add user roles and permissions

### Database
The system uses PostgreSQL with Sequelize ORM. The database will be automatically created and tables will be synced when the backend starts.

### CORS
CORS is enabled for development. In production, configure it to only allow your frontend domain.

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env` file
   - Verify database exists

2. **Port Already in Use**
   - Change the port in the `.env` file
   - Kill processes using the port

3. **CORS Errors**
   - Ensure backend is running on the correct port
   - Check CORS configuration in backend

4. **Authentication Errors**
   - Clear browser localStorage
   - Restart the application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 
