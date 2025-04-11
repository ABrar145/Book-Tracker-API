import { Request, Response } from "express";
import * as reviewService from "../services/reviewService";

export const getReviews = async (_req: Request, res: Response) => {
  const reviews = await reviewService.getReviews();
  res.status(200).json(reviews);
};

export const getReviewById = async (req: Request, res: Response) => {
  const review = await reviewService.getReviewById(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });
  res.status(200).json(review);
};

export const createReview = async (req: Request, res: Response) => {
  const newReview = await reviewService.createReview(req.body);
  res.status(201).json(newReview);
};

export const updateReview = async (req: Request, res: Response) => {
  const updated = await reviewService.updateReview(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Review not found" });
  res.status(200).json(updated);
};

export const deleteReview = async (req: Request, res: Response) => {
  const deleted = await reviewService.deleteReview(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Review not found" });
  res.status(200).json({ message: "Review deleted successfully" });
};