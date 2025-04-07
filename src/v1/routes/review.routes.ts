import express from 'express';
import {

  getReviews,
  getReviewById,
  getReviewsByBook,
  addReview,
  updateReview,
  deleteReview
} from '../controllers/review.controller';

const router = express.Router();

router.get('/', getReviews);
router.get('/:id', getReviewById);
router.get('/book/:bookId', getReviewsByBook);
router.post('/', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

  getReviews, getReviewById, getReviewsByBook,
  addReview, updateReview, deleteReview
} from '../controllers/review.controller';
import { validateBody } from '../middleware/validate.middleware';
import { reviewSchema } from '../../validators/review.validator';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', verifyToken, getReviews);
router.get('/:id', verifyToken, getReviewById);
router.get('/book/:bookId', verifyToken, getReviewsByBook);
router.post('/', verifyToken, validateBody(reviewSchema), addReview);
router.put('/:id', verifyToken, validateBody(reviewSchema), updateReview);
router.delete('/:id', verifyToken, deleteReview);


export default router;
