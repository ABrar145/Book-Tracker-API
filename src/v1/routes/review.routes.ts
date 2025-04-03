import express from 'express';
import {
  getReviews, getReviewById, getReviewsByBook,
  addReview, updateReview, deleteReview
} from '../controllers/review.controller';
import { validateBody } from '../middleware/validate.middleware';
import { reviewSchema } from '../../validators/review.validator';

const router = express.Router();

router.get('/', getReviews);
router.get('/:id', getReviewById);
router.get('/book/:bookId', getReviewsByBook);
router.post('/', validateBody(reviewSchema), addReview);
router.put('/:id', validateBody(reviewSchema), updateReview);
router.delete('/:id', deleteReview);

export default router;
