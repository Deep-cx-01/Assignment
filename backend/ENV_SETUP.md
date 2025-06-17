# Environment Setup

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/review_system
JWT_SECRET=your_super_secret_jwt_key_for_development_only
```

## Database Setup

1. Install PostgreSQL if you haven't already
2. Create a database named `review_system`
3. Update the DATABASE_URL with your actual database credentials

## JWT Secret

Generate a secure JWT secret for production use. For development, you can use any string.

## Port Configuration

The default port is 5000. You can change it by updating the PORT variable. 