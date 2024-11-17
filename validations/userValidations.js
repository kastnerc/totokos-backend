import { body } from "express-validator";

const userRules = [
    body('*.username').exists().withMessage('The username is required.')
    .isLength({ min: 3, max: 50 })
    .withMessage('The username must be between 3 and 50 characters long.')
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage('The username can only contain letters, numbers, hyphens, and underscores.'),
    body('*.password').exists().withMessage('The password is required.').isLength({ min: 8 }).withMessage('The password must be at least 8 characters long.').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('The password must contain at least one uppercase letter, one lowercase letter, and one number.'),
    body('*.surname').exists().withMessage('The surname is required.').isLength({ min: 2, max: 100 }).withMessage('The surname must be between 2 and 100 characters long.').matches(/^[A-Za-z\s]+$/).withMessage('The surname can only contain letters and spaces.'),
    body('*.name').exists().withMessage('The name is required.').isLength({ min: 2, max: 100 }).withMessage('The name must be between 2 and 100 characters long.').matches(/^[A-Za-z\s]+$/).withMessage('The name can only contain letters and spaces.'),
    body('*.email').exists().withMessage('The email address is required.').isEmail().withMessage('The email address must be valid.'),
    body('*.role')
  .exists().withMessage('The role is required.')
  .isIn(['admin', 'user', 'client', 'employe'])
  .withMessage('The role must be "admin", "user", "client", or "employe".'),
    body('*.contact_info').exists().matches(/^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/).withMessage('The contact info must be a valid phone number.'),
    body('*.address').optional().isLength({ min: 5, max: 255 }).withMessage('The address must be between 5 and 255 characters long.'),
    body('*.city').optional().isLength({ min: 2, max: 100 }).withMessage('The city must be between 2 and 100 characters long.').matches(/^[A-Za-z\s]+$/).withMessage('The city can only contain letters and spaces.'),
    body('*.province').optional().isLength({ min: 2, max: 100 }).withMessage('The province must be between 2 and 100 characters long.').matches(/^[A-Za-z\s]+$/).withMessage('The province can only contain letters and spaces.'),
    body('*.country').optional().isLength({ min: 2, max: 100 }).withMessage('The country must be between 2 and 100 characters long.').matches(/^[A-Za-z\s]+$/).withMessage('The country can only contain letters and spaces.'),
    body('*.postal_code').optional().matches(/^[A-Za-z0-9\s-]+$/).withMessage('The postal code must be valid.').isLength({ min: 5, max: 10 }).withMessage('The postal code must be between 5 and 10 characters long.')
];

export default userRules;