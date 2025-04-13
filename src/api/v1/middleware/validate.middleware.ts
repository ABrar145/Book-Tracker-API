
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(" Validating body:", req.body);
    console.log(" Schema keys:", Object.keys(schema.describe().keys));

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map((detail) => detail.message);
      return res.status(400).json({ status: "error", message: "Validation failed", errors: details });
    }

    next();
  };
};


export default validateRequest;
