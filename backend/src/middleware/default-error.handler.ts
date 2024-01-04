import { ErrorRequestHandler } from "express";
import Joi from "joi";

export const getDefaultErrorHandler = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof Joi.ValidationError && err.isJoi) {
      res.status(400).json({
        success: false,
        message: err.message,
        details: err.details,
      });
      return;
    }
    const message = (err && err.message) || "Unknown error";
    res.status(500).json({
      success: false,
      message,
    });
  };
  return handler;
};
