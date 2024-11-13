import { Router } from "express";
import { getProducts, getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, listIngredientsByProductId, listPriceHistoryByProductId, addIngredientToProduct, updateIngredientOfProduct, deleteIngredientFromProduct } from "../controllers/productController.js";

const route = Router()

route.get('/product-page/', getProducts)
.get('/', getAllProducts)
.get('/:id', getProductById)
.get('/:id/ingredients', listIngredientsByProductId)
.get('/:id/price-history', listPriceHistoryByProductId)
.post('/:id/ingredients', addIngredientToProduct)
.post('/', addProduct)
.patch('/:id', updateProduct)
.patch('/:id_product/ingredients/:id_ingredient', updateIngredientOfProduct)
.delete('/:id_product/ingredients/:id_ingredient', deleteIngredientFromProduct)
.delete('/:id', deleteProduct)

export default route