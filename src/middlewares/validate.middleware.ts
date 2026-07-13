// src/middlewares/validate.middleware.ts
import type { Request, Response, NextFunction } from 'express';
import { type ZodSchema, ZodError } from 'zod'; // 1. Change import here
import { ValidationError } from '../errors/ValidationError';

// 2. Update the parameter type from AnyZodObject to ZodSchema
export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        
        error.issues.forEach((err) => {
          const path = err.path.slice(1).join('.'); 
          formattedErrors[path || 'error'] = err.message;
        });

        return next(new ValidationError('Invalid request data', formattedErrors));
      }
      
      next(error);
    }
  };
};