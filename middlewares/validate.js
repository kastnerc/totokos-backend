import { validationResult } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    // Run each validation in the array
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array()); // Log validation errors
      return res.status(400).json({ errors: errors.array() }); // Send error response
    }

    // Proceed if validation passes
    next();
  };
};