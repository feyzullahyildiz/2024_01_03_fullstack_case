import { ErrorRequestHandler } from "express";
import { BaseError } from "../error/BaseError";
import Joi from "joi";

export const getDefaultErrorHandler = () => {
  
  const handler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof BaseError) {
      res.status(err.status).json({
        success: false,
        message: err.message,
      });
      return;
    }
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
