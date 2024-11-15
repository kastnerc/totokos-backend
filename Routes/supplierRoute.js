import { Router } from "express";
import { getSuppliers, getSupplierById, addSupplier, updateSupplier, deleteSupplier } from "../controllers/supplierController.js";
import { authorizeEmployee } from "../authentification/authorization.js";
import { checkToken } from "../authentification/checkToken.js";
import { validate } from "../middlewares/validate.js";
import supplierRules from "../validations/supplierValidations.js";


const route = Router()

route.use(checkToken, authorizeEmployee)

route.get('/', getSuppliers)
.get('/:id', getSupplierById)
.post('/', validate(supplierRules), addSupplier)
.patch('/:id', updateSupplier)
.delete('/:id', deleteSupplier)

export default route