import express from "express";
import * as bookController from "../controllers/book.controller";
import authMiddleware from "../middleware/auth.middleware";
import isAuthorized from "../middleware/authorize.middleware";
import validateRequest from "../middleware/validate.middleware";
import { bookSchema, deleteBookSchema } from "../../../validators/book.validator";

const router = express.Router();

// @swagger
// Tags: Books

// @swagger
// /api/v1/books:
//   get:
//     summary: Get all books
//     security:
//       - bearerAuth: []
//     tags: [Books]
//     responses:
//       200:
//         description: List of books
router.get("/", authMiddleware, bookController.getAllBooks);

// @swagger
// /api/v1/books:
//   post:
//     summary: Create a new book
//     security:
//       - bearerAuth: []
//     tags: [Books]
//     requestBody:
//       required: true
//       content:
//         application/json:
//           schema:
//             type: object
//             required:
//               - title
//               - author
//               - status
//             properties:
//               title:
//                 type: string
//               author:
//                 type: string
//               status:
//                 type: string
//                 enum: [available, unavailable]
//               genre:
//                 type: string
//               publishedYear:
//                 type: integer
//     responses:
//       201:
//         description: Book created
router.post(
  "/",
  authMiddleware,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  validateRequest(bookSchema),
  bookController.createBook
);

// @swagger
// /api/v1/books/{id}:
//   put:
//     summary: Update a book
//     security:
//       - bearerAuth: []
//     tags: [Books]
//     parameters:
//       - in: path
//         name: id
//         required: true
//         schema:
//           type: string
//     requestBody:
//       content:
//         application/json:
//           schema:
//             $ref: '#/components/schemas/Book'
//     responses:
//       200:
//         description: Book updated
router.put(
  "/:id",
  authMiddleware,
  isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
  validateRequest(bookSchema),
  bookController.updateBook
);

// @swagger
// /api/v1/books/{id}:
//   delete:
//     summary: Delete a book
//     security:
//       - bearerAuth: []
//     tags: [Books]
//     parameters:
//       - in: path
//         name: id
//         required: true
//         schema:
//           type: string
//     responses:
//       200:
//         description: Book deleted
router.delete(
  "/:id",
  authMiddleware,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(deleteBookSchema),
  bookController.deleteBook
);

export default router;
