import { Router } from "express";
import { getProducts, getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, listIngredientsByProduct, listIngredientsByProductId, listPriceHistoryByProductId, addIngredientToProduct, updateIngredientOfProduct, deleteIngredientFromProduct } from "../controllers/productController.js";

const route = Router()

route.get('/product-page/', getProducts)
.get('/', getAllProducts)
.get('/:id', getProductById)
.get('/:id/ingredients', listIngredientsByProductId)
.get('/product-page/:id/ingredients', listIngredientsByProduct)
.get('/:id/price-history', listPriceHistoryByProductId)
.post('/:id/ingredients', addIngredientToProduct)
.post('/', addProduct)
.patch('/', updateProduct)
.patch('/:id/ingredients/:ingredientId', updateIngredientOfProduct)
.delete('/:id/ingredients/:ingredientId', deleteIngredientFromProduct)
.delete('/:id', deleteProduct)

export default route