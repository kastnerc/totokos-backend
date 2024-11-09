import { Supplier } from '../relationships/relations.js'

// Get all suppliers
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll()
        res.status(200).json(suppliers)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Get a supplier by id
export const getSupplierById = async (req, res) => {
    const { id } = req.params
    try {
        const supplier = await Supplier.findByPk(id)
        res.status(200).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Add a supplier
export const addSupplier = async (req, res) => {
    const { name, address, phone, email } = req.body
    try {
        const supplier = await Supplier.create({ name, address, phone, email })
        res.status(201).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Update a supplier
export const updateSupplier = async (req, res) => {
    const { id } = req.params
    const { name, address, phone, email } = req.body
    try {
        const supplier = await Supplier.update({ name, address, phone, email }, { where: { id } })
        res.status(200).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Delete a supplier
export const deleteSupplier = async (req, res) => {
    const { id } = req.params
    try {
        const supplier = await Supplier.destroy({ where: { id } })
        res.status(200).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

