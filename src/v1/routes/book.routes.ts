import express from 'express';
import {
  getBooks, getBookById, addBook, updateBook, deleteBook
} from '../controllers/book.controller';
import { validateBody } from '../middleware/validate.middleware';
import { bookSchema } from '../../validators/book.validator';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/',verifyToken, getBooks);
router.get('/:id',verifyToken, getBookById);
router.post('/',verifyToken, validateBody(bookSchema), addBook);
router.put('/:id',verifyToken, validateBody(bookSchema), updateBook);
router.delete('/:id',verifyToken, deleteBook);

export default router;
