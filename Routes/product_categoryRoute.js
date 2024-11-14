import { Router } from "express";
import { getProductCategories, getProductCategoryById, addProductCategory, updateProductCategory, deleteProductCategory, listProductsByCategory } from "../controllers/product_categoryController.js";
import { checkToken } from "../authentification/checkToken.js";
import { authorizeEmployee } from "../authentification/authorization.js";	

const route = Router()

route.get('/', getProductCategories)
.get('/:id', getProductCategoryById)
.get('/:id/categories', listProductsByCategory)
.post('/', checkToken, authorizeEmployee, addProductCategory)
.patch('/:id', checkToken, authorizeEmployee, updateProductCategory)
.delete('/:id', checkToken, authorizeEmployee, deleteProductCategory)

export default route