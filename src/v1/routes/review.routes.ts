import express from 'express';
import {
  getReviews, getReviewById, getReviewsByBook,
  addReview, updateReview, deleteReview
} from '../controllers/review.controller';
import { validateBody } from '../middleware/validate.middleware';
import { reviewSchema } from '../../validators/review.validator';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Book reviews

 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 *   post:
 *     summary: Create a review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created

 * /api/reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review found
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review updated
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Review deleted
 */

router.get('/', verifyToken, getReviews);
router.get('/:id', verifyToken, getReviewById);
router.get('/book/:bookId', verifyToken, getReviewsByBook);
router.post('/', verifyToken, validateBody(reviewSchema), addReview);
router.put('/:id', verifyToken, validateBody(reviewSchema), updateReview);
router.delete('/:id', verifyToken, deleteReview);

export default router;
