import { Router } from "express";
import { getIngredients, getIngredientById, addIngredient, updateIngredient, deleteIngredient } from "../controllers/ingredientController.js";

const route = Router()

route.get('/', getIngredients)
.get('/:id',getIngredientById)
.post('/', addIngredient)
.patch('/:id', updateIngredient)
.delete('/:id', deleteIngredient)

export default route