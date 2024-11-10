import { Router } from "express";
import { getAllUsers, findUser, addUser, updateUser, deleteUser, listOrdersByUser } from "../controllers/userController.js";

const route = Router()

route.get('/', getAllUsers)
.get('/:id/orders', listOrdersByUser)
.get('/:id', findUser)
.post('/', addUser)
.patch('/:id', updateUser)
.delete('/:id', deleteUser)

export default route