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

export default router;
