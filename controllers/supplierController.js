import { Supplier } from '../relationships/Relations.js'

export const getSuppliers = async (req, res) => {
    try {
        // Fetch all suppliers from the database
        const suppliers = await Supplier.findAll()
        res.status(200).json(suppliers)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const getSupplierById = async (req, res) => {
    const { id } = req.params
    try {
        // Fetch the supplier by its primary key (id)
        const supplier = await Supplier.findByPk(id)
        res.status(200).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const addSupplier = async (req, res) => {
    const { name, address, phone, email } = req.body
    try {
        // Create a new supplier with the provided data
        const supplier = await Supplier.create({ name, address, phone, email })
        res.status(201).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const updateSupplier = async (req, res) => {
    const { id } = req.params
    const { name, address, phone, email } = req.body
    try {
        // Update the supplier with the provided data where the id matches
        const supplier = await Supplier.update({ name, address, phone, email }, { where: { id } })
        res.status(200).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const deleteSupplier = async (req, res) => {
    const { id } = req.params
    try {
        // Delete the supplier where the id matches
        const supplier = await Supplier.destroy({ where: { id } })
        res.status(200).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}