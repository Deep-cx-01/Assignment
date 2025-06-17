import express, { Request, Response, NextFunction } from 'express';
import { body, param, ValidationChain } from 'express-validator';
import { auth } from '../middleware/auth';
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getPopularTags,
} from '../controllers/reviewController';

const router = express.Router();

// Validation middleware
const reviewValidation: ValidationChain[] = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('Each tag must be between 2 and 20 characters'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  body('images.*')
    .optional()
    .isString()
    .isURL()
    .withMessage('Each image must be a valid URL'),
];

// Routes
router.post(
  '/products/:productId/reviews',
  auth,
  param('productId').isUUID().withMessage('Invalid product ID'),
  reviewValidation,
  (req: Request, res: Response, next: NextFunction) => {
    createReview(req, res).catch(next);
  }
);

router.get(
  '/products/:productId/reviews',
  param('productId').isUUID().withMessage('Invalid product ID'),
  (req: Request, res: Response, next: NextFunction) => {
    getProductReviews(req, res).catch(next);
  }
);

router.put(
  '/reviews/:reviewId',
  auth,
  param('reviewId').isUUID().withMessage('Invalid review ID'),
  reviewValidation,
  (req: Request, res: Response, next: NextFunction) => {
    updateReview(req, res).catch(next);
  }
);

router.delete(
  '/reviews/:reviewId',
  auth,
  param('reviewId').isUUID().withMessage('Invalid review ID'),
  (req: Request, res: Response, next: NextFunction) => {
    deleteReview(req, res).catch(next);
  }
);

router.get(
  '/products/:productId/tags',
  param('productId').isUUID().withMessage('Invalid product ID'),
  (req: Request, res: Response, next: NextFunction) => {
    getPopularTags(req, res).catch(next);
  }
);

export default router; 