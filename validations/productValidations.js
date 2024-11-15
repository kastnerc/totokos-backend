import { body } from "express-validator";
import Product_Category from "../models/Product_Category.js";


const productRules = [
    // Validation for the product category ID
    body('*.id_category')
        .exists().withMessage('L\'ID de la catégorie est requis.')
        .isInt({ min: 1 }).withMessage('L\'ID de la catégorie doit être un entier positif.')
        .custom(async (value) => {
            const categoryExists = await Product_Category.findByPk(value);
            if (!categoryExists) {
                throw new Error('La catégorie n\'existe pas.');
            }
            return true;
        }),

    // Validation for product name
    body('*.product_name')
        .exists().withMessage('Le nom du produit est requis.')
        .isLength({ min: 3, max: 100 }).withMessage('Le nom du produit doit comporter entre 3 et 100 caractères.')
        .matches(/^[A-Za-z0-9\s,.-]+$/).withMessage('Le nom du produit ne peut contenir que des lettres, des chiffres, des espaces, des virgules, des points et des tirets.'),

    // Validation for product price
    body('*.product_price')
        .exists().withMessage('Le prix du produit est requis.')
        .isDecimal().withMessage('Le prix du produit doit être un nombre décimal valide.')
        .isFloat({ min: 0.01 }).withMessage('Le prix du produit doit être supérieur à 0.'),

    // Validation for description (optional)
    body('*.description')
        .optional()
        .isLength({ min: 5, max: 255 }).withMessage('La description doit comporter entre 5 et 255 caractères.')
        .matches(/^[A-Za-z0-9\s,.-]+$/).withMessage('La description ne peut contenir que des lettres, des chiffres, des espaces, des virgules, des points et des tirets.'),

    // Validation for stock
    body('*.stock')
        .exists().withMessage('La quantité en stock est requise.')
        .isInt({ min: 0 }).withMessage('Le stock doit être un entier positif ou zéro.'),

    // Validation for expiry date (optional)
    body('*.expiry_date')
        .optional()
        .isISO8601().withMessage('La date d\'expiration doit être une date ISO 8601 valide.')
        .isAfter().withMessage('La date d\'expiration doit être dans le futur.')
];

export default productRules;

