import { Router } from "express";
import { getAllUsers, findUser, addUser, updateUser, delUser} from "../controllers/userController.js";

const route = Router()

route.get('/', getAllUsers)
get('/:id', findUser)
.post('/', addUser)
.patch('/', updateUser)
.delete('/', delUser)


export default route