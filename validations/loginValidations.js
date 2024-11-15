import { body } from "express-validator";

const loginRules = [
    body('email').exists().withMessage('Email is required').isEmail().withMessage("This is not a valid email"),
    body('password').exists().withMessage('Password is required')
];

export default loginRules;