import Review from '../models/review.model';
import { Request, Response } from 'express';

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create review', details: error });
  }
};

export const getReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'email') // Populate only the email field of user
      .populate('book', 'title'); // Populate only the title field of book
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'email')
      .populate('book', 'title');
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Invalid review ID' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedReview) return res.status(404).json({ error: 'Review not found' });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update review', details: error });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ error: 'Review not found' });
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
