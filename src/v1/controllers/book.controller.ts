import { Request, Response } from 'express';

export const getBooks = (req: Request, res: Response) => {
  res.json([{ id: '1', title: 'Sample Book', author: 'Author', status: 'reading' }]);
};

export const getBookById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, title: 'Sample Book', author: 'Author', status: 'read' });
};

export const addBook = (req: Request, res: Response) => {
  const book = req.body;
  res.status(201).json({ id: 'new-book-id', ...book });
};

export const updateBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  res.json({ id, ...updatedData });
};

export const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).send();
};
