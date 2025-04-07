import Joi from 'joi';

export const reviewSchema = Joi.object({
  bookId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional(),
});
