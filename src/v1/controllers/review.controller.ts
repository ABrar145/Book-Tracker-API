import { Request, Response } from 'express';
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
