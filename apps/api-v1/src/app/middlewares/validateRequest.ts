import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { TErrorSources } from "@piggy/types";

interface ValidationError {
  issues: Array<{
    path: (string | number)[];
    message: string;
  }>;
}

interface ValidationSchema {
  parseAsync: (data: unknown) => Promise<unknown>;
}

const validateRequest = (schema: ValidationSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      // Check if it's a validation error with issues
      if (error && typeof error === 'object' && 'issues' in error) {
        const validationError = error as ValidationError;
        const errorSources: TErrorSources = validationError.issues.map((err) => ({
          path: err.path.join(".") || "field",
          message: err.message || "Validation failed",
        }));

        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: "Validation Error",
          errorSources,
        });
      }
      
      // Pass other errors to global error handler
      next(error);
    }
  };
};

export default validateRequest;