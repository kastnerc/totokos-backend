import { Router } from "express";
import { getProductCategories, getProductCategoryById, addProductCategory, updateProductCategory, deleteProductCategory, listProductsByCategory } from "../controllers/product_categoryController.js";

const route = Router()

route.get('/', getProductCategories)
.get('/:id', getProductCategoryById)
.get('/:id/categories', listProductsByCategory)
.post('/', addProductCategory)
.patch('/:id', updateProductCategory)
.delete('/:id', deleteProductCategory)

export default route