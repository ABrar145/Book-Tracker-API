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

import { db } from '../../config/firebase';
import { Review } from '../models/review.model';

const reviewsCollection = db.collection('reviews');

export const getReviews = async (_req: Request, res: Response) => {
  try {
    const snapshot = await reviewsCollection.get();
    const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const doc = await reviewsCollection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: 'Review not found' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch review' });
  }
};

export const getReviewsByBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const snapshot = await reviewsCollection.where('bookId', '==', bookId).get();
    const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews for book' });
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const review: Review = req.body;
    const docRef = await reviewsCollection.add({ ...review, createdAt: new Date().toISOString() });
    res.status(201).json({ id: docRef.id, ...review });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id;
    await reviewsCollection.doc(reviewId).update(req.body);
    const updatedDoc = await reviewsCollection.doc(reviewId).get();
    res.json({ id: reviewId, ...updatedDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    await reviewsCollection.doc(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review' });
  }

};
