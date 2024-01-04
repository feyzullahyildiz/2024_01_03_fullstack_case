import type { RequestHandler } from "express";
import Joi from "joi";
export const getBodyValidatorMiddleware = () => {
  const loginValidatorSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const signUpValidatorSchema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const login: RequestHandler = (req, res, next) => {
    try {
      const result = loginValidatorSchema.validate(req.body);
      if (result.error) {
        throw result.error;
      }
      res.locals = result.value;
      next();
    } catch (error) {
      next(error);
    }
  };
  const signUp: RequestHandler = (req, res, next) => {
    try {
      const result = signUpValidatorSchema.validate(req.body);
      if (result.error) {
        throw result.error;
      }
      res.locals = result.value;
      next();
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
    signUp,
  };
};
