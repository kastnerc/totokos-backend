import { Router } from "express";
import { getAllUsers, findUser, addUser, updateUser, deleteUser, listOrdersByUser } from "../controllers/userController.js";
import { checkToken } from "../authentification/checkToken.js";
import { authorizeEmployee } from "../authentification/authorization.js";	
import { validate } from "../middlewares/validate.js";
import userRules from "../validations/userValidations.js"

const route = Router()

route.get('/', checkToken, authorizeEmployee, getAllUsers)
.get('/:id/orders', checkToken, listOrdersByUser)
.get('/:id', checkToken, findUser)
.post('/', validate(userRules), addUser)
.patch('/:id', checkToken, updateUser)
.delete('/:id', checkToken, deleteUser)

export default route