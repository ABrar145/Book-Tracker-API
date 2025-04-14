import Joi from 'joi';
import mongoose from 'mongoose';

// Custom ObjectId validator using Joi
const objectId = () =>
  Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectId Validation')
    .messages({
      'any.invalid': 'Invalid MongoDB ObjectId format',
    });

// Schema for creating a review
export const createReviewSchema = Joi.object({
  book: objectId().required(),
  user: objectId().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow('', null),
});

// Schema for updating a review
export const updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).optional(),
  comment: Joi.string().allow('', null).optional(),
});
