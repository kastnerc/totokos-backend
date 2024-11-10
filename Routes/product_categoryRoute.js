import { Router } from "express";
import { getProductCategories, getProductCategoryById, addProductCategory, updateProductCategory, deleteProductCategory, listProductsByCategory } from "../controllers/product_categoryController.js";

const route = Router()

route.get('/', getProductCategories)
.get('/:id', getProductCategoryById)
.get('/:id/categories', listProductsByCategory)
.post('/', addProductCategory)
.patch('/', updateProductCategory)
.delete('/', deleteProductCategory)

export default route