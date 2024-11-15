import { Router } from 'express';
import { login } from '../authentification/login.js';
import { validate } from '../middlewares/validate.js';
import loginRules from "../validations/loginValidations.js"

const authRoute = Router();

authRoute.post('/', validate(loginRules), login);

export default authRoute;