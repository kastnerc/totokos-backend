import { Router } from "express";
import { getSuppliers, getSupplierById, addSupplier, updateSupplier, deleteSupplier } from "../controllers/supplierController.js";
import { authorizeEmployee } from "../authentification/authorization.js";
import { checkToken } from "../authentification/checkToken.js";

const route = Router()

route.use(checkToken, authorizeEmployee)

route.get('/', getSuppliers)
.get('/:id', getSupplierById)
.post('/', addSupplier)
.patch('/:id', updateSupplier)
.delete('/:id', deleteSupplier)

export default route