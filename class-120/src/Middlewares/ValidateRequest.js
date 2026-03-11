// src/Middlewares/validateRequest.js
import { validationResult } from "express-validator";

/**
 * Middleware to validate requests using express-validator
 * If validation errors exist, responds with 400 and error details
 * Otherwise, calls next() to continue to the controller
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Respond with array of errors
    return res.status(400).json({ 
      message: "Validation failed",
      errors: errors.array()
    });
  }

  // No errors → proceed to next middleware/controller
  next();
};

export default validateRequest;