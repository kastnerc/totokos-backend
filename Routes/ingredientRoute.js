import { Router } from 'express';
import { getIngredients, getIngredientById, addIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredientController.js';
import { authorizeEmployee } from '../authentification/authorization.js';
import { checkToken } from '../authentification/checkToken.js';
import { validate } from '../middlewares/validate.js';
import ingredientRules from '../validations/ingredientValidations.js';

const route = Router();

route.use(checkToken);

route.use(authorizeEmployee);

route.get('/', getIngredients);
route.get('/:id', getIngredientById);
route.post('/', validate(ingredientRules), addIngredient);
route.patch('/:id', validate(ingredientRules), updateIngredient);
route.delete('/:id', deleteIngredient);

export default route;