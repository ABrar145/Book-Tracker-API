import Joi from 'joi';

export const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
  status: Joi.string().valid('read', 'reading', 'want-to-read').required(),
  notes: Joi.string().optional(),
  userId: Joi.string().optional(),
});
