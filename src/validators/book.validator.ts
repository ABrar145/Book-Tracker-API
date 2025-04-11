import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().optional(),
  publishedYear: Joi.number().integer().min(0).optional(),
});

export const deleteBookSchema = Joi.object({
  id: Joi.string().required(),
});
