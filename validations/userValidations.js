import { body } from "express-validator";

const userRules = [
    body('*.username').exists().withMessage('Le nom d\'utilisateur est requis.')
    .isLength({ min: 3, max: 50 })
    .withMessage('Le nom d\'utilisateur doit comporter entre 3 et 50 caractères.')
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage('Le nom d\'utilisateur ne peut contenir que des lettres, des chiffres, des tirets et des underscores.'),
    body('*.password').exists().withMessage('Le mot de passe est requis.').isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères.').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.'),
    body('*.surname').exists().withMessage('Le prénom est requis.').isLength({ min: 2, max: 100 }).withMessage('Le prénom doit comporter entre 2 et 100 caractères.').matches(/^[A-Za-z\s]+$/).withMessage('Le prénom ne peut contenir que des lettres et des espaces.'),
    body('*.name').exists().withMessage('Le nom est requis.').isLength({ min: 2, max: 100 }).withMessage('Le nom doit comporter entre 2 et 100 caractères.').matches(/^[A-Za-z\s]+$/).withMessage('Le nom ne peut contenir que des lettres et des espaces.'),
    body('*.email').exists().withMessage('L\'adresse e-mail est requise.').isEmail().withMessage('L\'adresse e-mail doit être valide.'),
    body('*.role')
  .exists().withMessage('Le rôle est requis.')
  .isIn(['admin', 'user', 'client', 'employe'])
  .withMessage('Le rôle doit être "admin", "user", "client" ou "employe".'),
    body('*.contact_info').exists().matches(/^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/).withMessage('Les informations de contact doivent être un numéro de téléphone valide.'),
    body('*.address').optional().isLength({ min: 5, max: 255 }).withMessage('L\'adresse doit comporter entre 5 et 255 caractères.'),
    body('*.city').optional().isLength({ min: 2, max: 100 }).withMessage('La ville doit comporter entre 2 et 100 caractères.').matches(/^[A-Za-z\s]+$/).withMessage('La ville ne peut contenir que des lettres et des espaces.'),
    body('*.province').optional().isLength({ min: 2, max: 100 }).withMessage('La province doit comporter entre 2 et 100 caractères.').matches(/^[A-Za-z\s]+$/).withMessage('La province ne peut contenir que des lettres et des espaces.'),
    body('*.country').optional().isLength({ min: 2, max: 100 }).withMessage('Le pays doit comporter entre 2 et 100 caractères.').matches(/^[A-Za-z\s]+$/).withMessage('Le pays ne peut contenir que des lettres et des espaces.'),
    body('*.postal_code').optional().matches(/^[A-Za-z0-9\s-]+$/).withMessage('Le code postal doit être valide.').isLength({ min: 5, max: 10 }).withMessage('Le code postal doit comporter entre 5 et 10 caractères.')
];

export default userRules;

