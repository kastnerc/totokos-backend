import { body } from 'express-validator';

const ingredientUpdateRules = [
  // Validate the fields in the request body
  body('*.ingredient_name')
  .exists().withMessage('Ingredient name is required')
  .isLength({ min: 4 }).withMessage('The name must be at least 4 characters long'),

  body('*.stock')
  .exists().withMessage('Stock is required')
    .isInt({ gt: 0 }).withMessage('Stock must be a positive integer'),

  body('*.expiry_date')
  .exists().withMessage('Expiry date is required')
    .isISO8601().withMessage('The expiry date must be valid'),

  body('*.price_per_unit')
  .exists().withMessage('Price is required')
    .isDecimal().withMessage('Price must be a valid decimal number'),

  body('*.unit_measure')
    .exists().withMessage('Unit of measurement is required')
    .matches(/(g|kg|oz|lbs?|mg|ml|l|fl\.?\s*oz|cups?|tbsp|tbs?|tsp|pieces?|count|ea|packet|unit)/)
    .withMessage('The unit of measurement is invalid')
];

export default ingredientUpdateRules;
