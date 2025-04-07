import Joi from 'joi';

export const userSchema = Joi.object({
  displayName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('user', 'admin').optional(),
});
