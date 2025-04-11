import express from 'express';
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  // getReviewsByBook, // Uncomment if implemented
} from '../controllers/review.controller';
import validate from '../middleware/validate.middleware';
import {
  createReviewSchema,
  updateReviewSchema,
} from '../../../validators/review.validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reviews
 */

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Review ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single review
 *       404:
 *         description: Review not found
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - book
 *               - user
 *               - rating
 *             properties:
 *               book:
 *                 type: string
 *               user:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 */

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Review ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated
 *       404:
 *         description: Review not found
 */

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Review ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */

router.get('/', getReviews);
router.get('/:id', getReviewById);


router.post('/', validate(createReviewSchema), createReview);
router.put('/:id', validate(updateReviewSchema), updateReview);
router.delete('/:id', deleteReview);

export default router;
