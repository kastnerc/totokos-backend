import { body } from "express-validator";

const supplierRules = [
    // Ensure the body is an array of supplier objects
    body('').isArray().withMessage('Le corps de la requête doit être un tableau de fournisseurs.'),

    // Validate each supplier object inside the array
    body('*.supplier_name')
        .exists().withMessage('Le nom du fournisseur est requis.')
        .isLength({ min: 3, max: 100 }).withMessage('Le nom du fournisseur doit comporter entre 3 et 100 caractères.')
        .matches(/^[A-Za-z0-9\s,.\-&]+$/).withMessage('Le nom du fournisseur ne peut contenir que des lettres, des chiffres, des espaces, des virgules, des points, des tirets et des esperluettes (&).'),


    body('*.supplier_address')
        .exists().withMessage('L\'adresse du fournisseur est requise.')
        .isLength({ min: 5, max: 255 }).withMessage('L\'adresse du fournisseur doit comporter entre 5 et 255 caractères.')
        .matches(/^[A-Za-z0-9\s,.-]+$/).withMessage('L\'adresse du fournisseur ne peut contenir que des lettres, des chiffres, des espaces, des virgules, des points et des tirets.'),

    body('*.telephone_contact')
        .optional({ checkFalsy: true })
        .isMobilePhone('any', { strictMode: false }).withMessage('Le contact téléphonique doit être un numéro de téléphone valide.'),

    body('*.supplier_email')
        .exists().withMessage('L\'email du fournisseur est requis.')
        .isEmail().withMessage('L\'email du fournisseur doit être une adresse email valide.')
        .normalizeEmail(),  // Normalize email to lowercase to avoid case sensitivity issues
];

export default supplierRules;
