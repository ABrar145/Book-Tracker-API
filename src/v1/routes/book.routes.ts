import express from 'express';
import {
  getBooks, getBookById, addBook, updateBook, deleteBook
} from '../controllers/book.controller';
import { validateBody } from '../middleware/validate.middleware';
import { bookSchema } from '../../validators/book.validator';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', validateBody(bookSchema), addBook);
router.put('/:id', validateBody(bookSchema), updateBook);
router.delete('/:id', deleteBook);

export default router;
