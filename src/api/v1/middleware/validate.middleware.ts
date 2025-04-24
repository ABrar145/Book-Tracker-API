
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log(" Validating body:", req.body);
    console.log(" Schema keys:", Object.keys(schema.describe().keys));

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map((detail) => detail.message);
      res.status(400).json({ status: "error", message: "Validation failed", errors: details });
      return; 
    }

    next();
  };
};



export default validateRequest;
