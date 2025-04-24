import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";

export const getReviews = async (_req: Request, res: Response): Promise<void> => {
  const reviews = await reviewService.getReviews();
  res.status(200).json(reviews);
};

export const getReviewById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      res.status(404).json({ error: "Review not found" });
      return;
    }
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
  const newReview = await reviewService.createReview(req.body);
  res.status(201).json(newReview);
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
  const updated = await reviewService.updateReview(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: "Review not found" });
    return;
  }
  res.status(200).json(updated);
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  const deleted = await reviewService.deleteReview(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Review not found" });
    return;
  }
  res.status(200).json({ message: "Review deleted successfully" });
};
