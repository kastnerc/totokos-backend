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
    // Retrieve the new suppliers' information (array of supplier objects)
    const suppliers = req.body;

    // Validate if the input is an array and it's not empty
    if (!Array.isArray(suppliers) || suppliers.length === 0) {
        return res.status(400).json({ message: "No suppliers provided or invalid data format." });
    }

    try {
        // Create each supplier
        const createdSuppliers = [];
        for (const supplier of suppliers) {
            const { supplier_name, supplier_address, telephone_contact, supplier_email } = supplier;

            // Validate necessary fields
            if (!supplier_name || !supplier_address || !telephone_contact || !supplier_email) {
                console.log("Missing required fields for supplier:", supplier_name);
                continue; // Skip this supplier if any field is missing
            }

            // Create the supplier in the database
            const result = await Supplier.create({ supplier_name, supplier_address, telephone_contact, supplier_email });
            createdSuppliers.push(result);
        }

        // Respond with the created suppliers
        res.status(201).json({ data: createdSuppliers, message: "Suppliers successfully created" });
    } catch (error) {
        console.log('Error during supplier creation:', error);
        res.status(400).json({ message: error.message });
    }
};

export const updateSupplier = async (req, res) => {
    const { id } = req.params
    const { name, address, phone, email } = req.body
    try {
        // Update the supplier with the provided data where the id matches
        const supplier = await Supplier.update({ supplier_name, supplier_address, telephone_contact, supplier_email }, { where: { id_supplier: id } })
        res.status(200).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const deleteSupplier = async (req, res) => {
    const { id } = req.params
    try {
        // Delete the supplier where the id matches
        const supplier = await Supplier.destroy({ where: { id_supplier: id } })
        res.status(200).json(supplier)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}