import { Router } from "express";
import { getIngredients, getIngredientById, addIngredient, updateIngredient, deleteIngredient } from "../controllers/ingredientController.js";
import { authorizeEmployee } from "../authentification/authorization.js";
import { checkToken } from "../authentification/checkToken.js";

const route = Router()

route.use(checkToken, authorizeEmployee)

route.get('/', getIngredients)
.get('/:id',getIngredientById)
.post('/', addIngredient)
.patch('/:id', updateIngredient)
.delete('/:id', deleteIngredient)

export default route