import ApiError from '../utils/ApiError.js';

/**
 * Generic validator middleware using Zod schemas
 * @param {import('zod').ZodSchema} schema 
 */
const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate req.body against schema
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error.errors) {
        // Zod validation errors
        const validationErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        return next(new ApiError(400, 'Request validation failed', validationErrors));
      }
      
      next(new ApiError(400, error.message));
    }
  };
};

export default validate;
