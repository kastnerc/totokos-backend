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
    // Retrieve the supplier ID from the request parameters
    const { id } = req.params;
    // Retrieve the updated supplier information from the request body
    const updatedData = req.body;

    try {
        // Update the supplier with the provided data where the id matches
        const [updatedRows] = await Supplier.update(updatedData, {
            where: { id_supplier: id }
        });

        // Check if any rows were updated
        if (updatedRows > 0) {
            res.status(200).json({ message: "Supplier updated successfully" });
        } else {
            res.status(404).json({ message: "Supplier not found or no changes made" });
        }
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteSupplier = async (req, res) => {
    // Retrieve the supplier ID from the request parameters
    const { id } = req.params;

    try {
        // Delete the supplier where the id matches
        const deletedRows = await Supplier.destroy({
            where: { id_supplier: id }
        });

        // Check if any rows were deleted
        if (deletedRows > 0) {
            res.status(200).json({ message: "Supplier deleted successfully" });
        } else {
            res.status(404).json({ message: "Supplier not found" });
        }
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
};