import Joi from 'joi';

export const createUserSchema = Joi.object({
  uid: Joi.string().required(), // Firebase UID
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
});
