import { body } from "express-validator";

const supplierRules = [
    body('').isArray().withMessage('The request body must be an array of suppliers.'),

    body('*.supplier_name')
        .exists().withMessage('The supplier name is required.')
        .isLength({ min: 3, max: 100 }).withMessage('The supplier name must be between 3 and 100 characters long.')
        .matches(/^[A-Za-z0-9\s,.\-&]+$/).withMessage('The supplier name can only contain letters, numbers, spaces, commas, periods, hyphens, and ampersands (&).'),

    body('*.supplier_address')
        .exists().withMessage('The supplier address is required.')
        .isLength({ min: 5, max: 255 }).withMessage('The supplier address must be between 5 and 255 characters long.')
        .matches(/^[A-Za-z0-9\s,.-]+$/).withMessage('The supplier address can only contain letters, numbers, spaces, commas, periods, and hyphens.'),

    body('*.telephone_contact')
        .optional({ checkFalsy: true })
        .isMobilePhone('any', { strictMode: false }).withMessage('The telephone contact must be a valid phone number.'),

    body('*.supplier_email')
        .exists().withMessage('The supplier email is required.')
        .isEmail().withMessage('The supplier email must be a valid email address.'),
];

export default supplierRules;