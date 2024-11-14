import { Router } from "express";
import { getProducts, getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, listIngredientsByProductId, listPriceHistoryByProductId, addIngredientToProduct, updateIngredientOfProduct, deleteIngredientFromProduct } from "../controllers/productController.js";
import { checkToken } from "../authentification/checkToken.js";
import { authorizeEmployee } from "../authentification/authorization.js";	

const route = Router()

route.get('/product-page/', getProducts)
.get('/', getAllProducts)
.get('/:id', getProductById)
.get('/:id/ingredients', checkToken, authorizeEmployee, listIngredientsByProductId)
.get('/:id/price-history', checkToken, authorizeEmployee, listPriceHistoryByProductId)
.post('/:id/ingredients', checkToken, authorizeEmployee, addIngredientToProduct)
.post('/', checkToken, authorizeEmployee, addProduct)
.patch('/:id', checkToken, authorizeEmployee, updateProduct)
.patch('/:id_product/ingredients/:id_ingredient', checkToken, authorizeEmployee, updateIngredientOfProduct)
.delete('/:id_product/ingredients/:id_ingredient', checkToken, authorizeEmployee, deleteIngredientFromProduct)
.delete('/:id', checkToken, authorizeEmployee, deleteProduct)

export default route