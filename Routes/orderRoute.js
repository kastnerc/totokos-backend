import { Router } from "express";
import { getOrders, getOrderById, deleteOrder, createOrder, getProductInfoByOrderId, updateOrder, deleteProductFromOrder } from "../controllers/orderController.js";

const route = Router()

route.get('/', getOrders)
.get('/:id', getOrderById)
.get('/:id/product', getProductInfoByOrderId)
.post('/', createOrder)
.patch('/', updateOrder)
.delete('/', deleteOrder)
.delete('/:id/product', deleteProductFromOrder)

export default route