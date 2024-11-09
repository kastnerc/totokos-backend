import { Router } from "express";
import { getProductCategories, getProductCategoryById, addProductCategory, updateProductCategory, deleteProductCategory } from "../controllers/product_categoryController.js";

const route = Router()

route.get('/', getProductCategories)
.get('/:id', getProductCategoryById)
.post('/', addProductCategory)
.patch('/', updateProductCategory)
.delete('/', deleteProductCategory)

export default route