import { Router } from "express";
import { getProducts, getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, listIngredientsByProductId, listPriceHistoryByProductId, addIngredientToProduct, updateIngredientOfProduct, deleteIngredientFromProduct, listProductsByCategory } from "../controllers/productController.js";
import { checkToken } from "../authentification/checkToken.js";
import { authorizeEmployee } from "../authentification/authorization.js";	
import { validate } from "../middlewares/validate.js";
import productRules from "../validations/productValidations.js";

const route = Router()

route.get('/product-page/', getProducts)
.get('/', getAllProducts)
.get('/:id', getProductById)
.get('/:id/ingredients', checkToken, authorizeEmployee, listIngredientsByProductId)
.get('/:id/price-history', checkToken, authorizeEmployee, listPriceHistoryByProductId)
.get('/category/:id', listProductsByCategory)
.post('/:id/ingredients', checkToken, authorizeEmployee, addIngredientToProduct)
.post('/', validate(productRules), checkToken, authorizeEmployee, addProduct)
.patch('/:id', checkToken, authorizeEmployee, updateProduct)
.patch('/:id_product/ingredients/:id_ingredient', checkToken, authorizeEmployee, updateIngredientOfProduct)
.delete('/:id_product/ingredients/:id_ingredient', checkToken, authorizeEmployee, deleteIngredientFromProduct)
.delete('/:id', checkToken, authorizeEmployee, deleteProduct)

export default route