import { body } from "express-validator";
import Product_Category from "../models/Product_Category.js";

const productRules = [
    // Validation for the product category ID
    body('*.id_category')
        .exists().withMessage('The category ID is required.')
        .isInt({ min: 1 }).withMessage('The category ID must be a positive integer.')
        .custom(async (value) => {
            const categoryExists = await Product_Category.findByPk(value);
            if (!categoryExists) {
                throw new Error('The category does not exist.');
            }
            return true;
        }),

    // Validation for product name
    body('*.product_name')
        .exists().withMessage('The product name is required.')
        .isLength({ min: 3, max: 100 }).withMessage('The product name must be between 3 and 100 characters long.')
        .matches(/^[A-Za-z0-9\s,.-]+$/).withMessage('The product name can only contain letters, numbers, spaces, commas, periods, and hyphens.'),

    // Validation for product price
    body('*.product_price')
        .exists().withMessage('The product price is required.')
        .isDecimal().withMessage('The product price must be a valid decimal number.')
        .isFloat({ min: 0.01 }).withMessage('The product price must be greater than 0.'),

    // Validation for description (optional)
    body('*.description')
        .optional()
        .isLength({ min: 5, max: 255 }).withMessage('The description must be between 5 and 255 characters long.')
        .matches(/^[A-Za-z0-9\s,.-]+$/).withMessage('The description can only contain letters, numbers, spaces, commas, periods, and hyphens.'),

    // Validation for stock
    body('*.stock')
        .exists().withMessage('The stock quantity is required.')
        .isInt({ min: 0 }).withMessage('The stock must be a positive integer or zero.'),

    // Validation for expiry date (optional)
    body('*.expiry_date')
        .optional()
        .isISO8601().withMessage('The expiry date must be a valid ISO 8601 date.')
        .isAfter().withMessage('The expiry date must be in the future.')
];

export default productRules;
