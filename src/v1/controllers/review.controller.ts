import { Request, Response } from 'express';

export const getReviews = (req: Request, res: Response) => {
  res.json([{ id: '1', bookId: '123', rating: 5, comment: 'Great book!' }]);
};

export const getReviewById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, rating: 4, comment: 'Nice read!' });
};

export const getReviewsByBook = (req: Request, res: Response) => {
  const { bookId } = req.params;
  res.json([{ id: '1', bookId, rating: 5, comment: 'Loved it!' }]);
};

export const addReview = (req: Request, res: Response) => {
  const review = req.body;
  res.status(201).json({ id: 'new-review-id', ...review });
};

export const updateReview = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  res.json({ id, ...updatedData });
};

export const deleteReview = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).send();
};
