import { Router } from "express";
import { getProducts, getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, listIngredientsByProduct, listIngredientsByProductId, listPriceHistoryByProductId, addIngredientToProduct, updateIngredientOfProduct, deleteIngredientFromProduct } from "../controllers/productController.js";

const route = Router()

route.get('/product-page/', getProducts)
.get('/', getAllProducts)
.get('/:id', getProductById)
.get('/products/:id/ingredients', listIngredientsByProductId)
.get('/product-page/:id/ingredients', listIngredientsByProduct)
.get('/products/:id/price-history', listPriceHistoryByProductId)
.post('/products/:id/ingredients', addIngredientToProduct)
.post('/', addProduct)
.patch('/', updateProduct)
.patch('/products/:id/ingredients/:ingredientId', updateIngredientOfProduct)
.delete('/products/:id/ingredients/:ingredientId', deleteIngredientFromProduct)
.delete('/', deleteProduct)

export default route

