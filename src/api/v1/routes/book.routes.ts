import express from "express";
import * as bookController from "../controllers/book.controller";
import authMiddleware from "../middleware/auth.middleware";
import isAuthorized from "../middleware/authorize.middleware";
import validateRequest from "../middleware/validate.middleware";
import { bookSchema, deleteBookSchema } from "../../../validators/book.validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management APIs
 */

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", authMiddleware, bookController.getAllBooks);

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created successfully
 */
router.post(
  "/",
  authMiddleware,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  validateRequest(bookSchema),
  bookController.createBook
);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 */
router.put(
  "/:id",
  authMiddleware,
  isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
  validateRequest(bookSchema),
  bookController.updateBook
);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(deleteBookSchema),
  bookController.deleteBook
);

export default router;
