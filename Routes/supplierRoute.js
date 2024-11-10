import { Router } from "express";
import { getSuppliers, getSupplierById, addSupplier, updateSupplier, deleteSupplier } from "../controllers/supplierController.js";

const route = Router()

route.get('/', getSuppliers)
.get('/:id', getSupplierById)
.post('/', addSupplier)
.patch('/:id', updateSupplier)
.delete('/:id', deleteSupplier)

export default route