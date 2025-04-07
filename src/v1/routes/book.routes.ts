import express from 'express';
import {
  getBooks, getBookById, addBook, updateBook, deleteBook
} from '../controllers/book.controller';
import { validateBody } from '../middleware/validate.middleware';
import { bookSchema } from '../../validators/book.validator';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Manage reading list books

 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created

 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *   put:
 *     summary: Update book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 *   delete:
 *     summary: Delete book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted
 */

router.get('/', verifyToken, getBooks);
router.get('/:id', verifyToken, getBookById);
router.post('/', verifyToken, validateBody(bookSchema), addBook);
router.put('/:id', verifyToken, validateBody(bookSchema), updateBook);
router.delete('/:id', verifyToken, deleteBook);

export default router;
