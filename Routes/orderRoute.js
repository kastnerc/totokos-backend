import { Router } from "express";
import { getOrders, getOrderById, deleteOrder } from "../controllers/orderController.js";

const route = Router()

route.get('/', getOrders)
.get('/:id', getOrderById)
.delete('/', deleteOrder)

export default route