import { Request, Response } from 'express';
import { db } from '../../config/firebase';
import { Book } from '../models/book.model';

const booksCollection = db.collection('books');

export const getBooks = async (req: Request, res: Response) => {
  try {
    const snapshot = await booksCollection.get();
    const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const doc = await booksCollection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: 'Book not found' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get book' });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const newBook: Book = req.body;
    const docRef = await booksCollection.add({ ...newBook, createdAt: new Date().toISOString() });
    res.status(201).json({ id: docRef.id, ...newBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    await booksCollection.doc(bookId).update(req.body);
    const updatedDoc = await booksCollection.doc(bookId).get();
    res.json({ id: bookId, ...updatedDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await booksCollection.doc(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book' });
  }
};
