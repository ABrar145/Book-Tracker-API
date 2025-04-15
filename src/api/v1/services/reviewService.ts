import reviewModel from "../models/review.model";

export const getReviews = async () => reviewModel.find();

export const getReviewById = async (id: string) => reviewModel.findById(id);

export const createReview = async (data: any) => reviewModel.create(data);

export const updateReview = async (id: string, data: any) =>
  reviewModel.update(id, data);

export const deleteReview = async (id: string) => reviewModel.delete(id);