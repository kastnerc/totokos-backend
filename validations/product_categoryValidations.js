import { body } from "express-validator";

const product_categoryRules = [
    // Validate category_name for single category update (update without an array)
    body('*.category_name')
        .isLength({ min: 3, max: 255 }).withMessage('Name must be between 5 and 255 characters long') 
        .matches(/^[A-Za-z0-9\s,.-]+$/).withMessage("Category name must only contain letters, numbers, spaces, commas, periods, and hyphens."), // Only allow letters, numbers, spaces, commas, periods, and hyphens

    body('*.category_description')
        .optional()  // Make this field optional for update
        .isLength({ min: 5, max: 255 }).withMessage('Description must be between 5 and 255 characters long') 
        .matches(/^[A-Za-z0-9\s,.-]+$/).withMessage("This is not a valid description")  // Only allow letters, numbers, spaces, commas, periods, and hyphens
];

export default product_categoryRules;
