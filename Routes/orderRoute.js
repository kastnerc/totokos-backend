import { Router } from "express";
import { getOrders, getOrderById, deleteOrder, createOrder, getProductInfoByOrderId, updateOrder, deleteProductFromOrder } from "../controllers/orderController.js";
import { authorizeEmployee } from "../authentification/authorization.js";
import { checkToken } from "../authentification/checkToken.js";

const route = Router()

route.use(checkToken)

route.get('/', authorizeEmployee, getOrders)
.get('/:id', getOrderById)
.get('/:id/product', getProductInfoByOrderId)
.post('/', createOrder)
.patch('/:id', authorizeEmployee, updateOrder)
.delete('/:id', authorizeEmployee, deleteOrder)
.delete('/:id/product', authorizeEmployee, deleteProductFromOrder)

export default route