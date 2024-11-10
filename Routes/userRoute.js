import { Router } from "express";
import { getAllUsers, findUser, addUser, updateUser, delUser, listOrdersByUser} from "../controllers/userController.js";

const route = Router()

route.get('/', getAllUsers)
.get('/user-page/:id/orders', listOrdersByUser)
get('/:id', findUser)
.post('/', addUser)
.patch('/', updateUser)
.delete('/', delUser)


export default route