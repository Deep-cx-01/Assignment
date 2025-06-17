import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Review from '../models/Review';
import Product from '../models/Product';
import User from '../models/User';
import { Op } from 'sequelize';

interface AuthRequest extends Request {
  user?: any;
}

export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { productId, rating, comment, tags, images } = req.body;
    const userId = req.user.id;

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({
      where: { userId, productId },
    });

    if (existingReview) {
      res.status(400).json({ error: 'You have already reviewed this product' });
      return;
    }

    // Create the review
    const review = await Review.create({
      userId,
      productId,
      rating,
      comment,
      tags,
      images,
    });

    // Update product's average rating and total reviews
    const product = await Product.findByPk(productId);
    if (product) {
      const allReviews = await Review.findAll({ where: { productId } });
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / allReviews.length;

      await product.update({
        averageRating,
        totalReviews: allReviews.length,
      });
    }

    // Get user details for the response
    const user = await User.findByPk(userId);
    const reviewWithUser = {
      ...review.toJSON(),
      user: {
        id: user?.id,
        username: user?.username,
      },
    };

    res.status(201).json(reviewWithUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

    const reviews = await Review.findAndCountAll({
      where: { productId },
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
      order: [[sort as string, 'DESC']],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });

    res.json({
      reviews: reviews.rows,
      total: reviews.count,
      totalPages: Math.ceil(reviews.count / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { reviewId } = req.params;
    const { rating, comment, tags, images } = req.body;
    const userId = req.user.id;

    const review = await Review.findOne({
      where: { id: reviewId, userId },
    });

    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    await review.update({
      rating,
      comment,
      tags,
      images,
    });

    // Update product's average rating
    const product = await Product.findByPk(review.productId);
    if (product) {
      const allReviews = await Review.findAll({ where: { productId: review.productId } });
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / allReviews.length;

      await product.update({
        averageRating,
      });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findOne({
      where: { id: reviewId, userId },
    });

    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    const productId = review.productId;
    await review.destroy();

    // Update product's average rating and total reviews
    const product = await Product.findByPk(productId);
    if (product) {
      const allReviews = await Review.findAll({ where: { productId } });
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = allReviews.length > 0 ? totalRating / allReviews.length : 0;

      await product.update({
        averageRating,
        totalReviews: allReviews.length,
      });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPopularTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const reviews = await Review.findAll({
      where: { productId },
      attributes: ['tags'],
    });

    const tagCounts: { [key: string]: number } = {};
    reviews.forEach((review) => {
      review.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const popularTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    res.json(popularTags);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}; 