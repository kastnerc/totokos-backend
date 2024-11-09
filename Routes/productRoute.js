import { Router } from "express";
import { getProducts, getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const route = Router()

route.get('/product-page/', getProducts)
.get('/', getAllProducts)
.get('/:id', getProductById)
.post('/', addProduct)
.patch('/', updateProduct)
.delete('/', deleteProduct)

export default route