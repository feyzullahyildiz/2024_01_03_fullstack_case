import type { RequestHandler } from "express";
import Joi from "joi";
export const getBodyValidatorMiddleware = () => {
  const createTaskValidatorSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().empty().required(),
    dueDate: Joi.date().required(),
  });
  const createTask: RequestHandler = (req, res, next) => {
    try {
      const result = createTaskValidatorSchema.validate(req.body);
      if (result.error) {
        throw result.error;
      }
      req.body = result.value;
      next();
    } catch (error) {
      next(error);
    }
  };
  const updateTaskValidatorSchema = Joi.object({
    status: Joi.string().required(),
  });
  const updateTaskStatus: RequestHandler = (req, res, next) => {
    try {
      const result = updateTaskValidatorSchema.validate(req.body);
      if (result.error) {
        throw result.error;
      }
      req.body = result.value;
      next();
    } catch (error) {
      next(error);
    }
  };

  return {
    createTask,
    updateTaskStatus,
  };
};
