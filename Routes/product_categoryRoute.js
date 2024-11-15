import { Router } from "express";
import { getProductCategories, getProductCategoryById, addProductCategory, updateProductCategory, deleteProductCategory } from "../controllers/product_categoryController.js";
import { checkToken } from "../authentification/checkToken.js";
import { authorizeEmployee } from "../authentification/authorization.js";	
import { validate } from "../middlewares/validate.js";
import product_categoryRules from "../validations/product_categoryValidations.js";


const route = Router()

route.get('/', getProductCategories)
.get('/:id', getProductCategoryById)
.post('/', validate(product_categoryRules), checkToken, authorizeEmployee, addProductCategory)
.patch('/:id', checkToken, authorizeEmployee, updateProductCategory)
.delete('/:id', checkToken, authorizeEmployee, deleteProductCategory)

export default route