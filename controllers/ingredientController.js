import { Ingredient } from '../relationships/Relations.js'
import { Op } from 'sequelize';

export const getIngredients = async (req, res) => {
    const { page = 1, limit = 10, ...filters } = req.query;

    try {
        const offset = (page - 1) * limit;
        const where = {};

        for (const [key, value] of Object.entries(filters)) {
            if (Ingredient.rawAttributes[key]) {
                where[key] = {
                    [Op.like]: `%${value}%`
                };
            }
        }

        const result = await Ingredient.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.status(200).json({
            data: result.rows,
            total: result.count,
            page: parseInt(page),
            pages: Math.ceil(result.count / limit)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getIngredientById = async (req, res) => {
    const { id } = req.params
    try {
        // Fetch the ingredient by its primary key (id)
        const ingredient = await Ingredient.findByPk(id)
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const addIngredient = async (req, res) => {
    const ingredients = req.body;  // Ensure this is an array of ingredient objects

    // Validate the ingredients input
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ message: "No ingredients provided or invalid data format." });
    }

    try {
        const createdIngredients = [];
        
        for (const ingredient of ingredients) {
            const { ingredient_name, id_supplier, stock, expiry_date, price_per_unit, unit_measure } = ingredient;
            
            // Validate required fields
            if (!ingredient_name || !id_supplier || !stock || !expiry_date || !price_per_unit || !unit_measure) {
                console.log("Missing required fields for ingredient:", ingredient_name);
                continue; // Skip if any field is missing
            }
            
            // Create the ingredient in the database
            const result = await Ingredient.create({ 
                ingredient_name, 
                id_supplier, 
                stock, 
                expiry_date, 
                price_per_unit, 
                unit_measure 
            });
            
            createdIngredients.push(result);
        }

        // Respond with the created ingredients
        res.status(201).json({ data: createdIngredients, message: "Ingredients successfully created" });
    } catch (error) {
        console.log('Error during ingredient creation:', error);
        res.status(400).json({ message: error.message });
    }
};

export const updateIngredient = async (req, res) => {
    // Retrieve the ingredient ID from the request parameters
    const { id } = req.params;
    // Retrieve the updated ingredient information from the request body
    const updatedData = req.body;

    try {
        // Update the ingredient with the provided data where the id matches
        const [updatedRows] = await Ingredient.update(updatedData, {
            where: { id_ingredient: id }
        });

        // Check if any rows were updated
        if (updatedRows > 0) {
            res.status(200).json({ message: "Ingredient updated successfully" });
        } else {
            res.status(404).json({ message: "Ingredient not found or no changes made" });
        }
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteIngredient = async (req, res) => {
    // Retrieve the ingredient ID from the request parameters
    const { id } = req.params;

    try {
        // Delete the ingredient where the id matches
        const deletedRows = await Ingredient.destroy({
            where: { id_ingredient: id }
        });

        // Check if any rows were deleted
        if (deletedRows > 0) {
            res.status(200).json({ message: "Ingredient deleted successfully" });
        } else {
            res.status(404).json({ message: "Ingredient not found" });
        }
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
};

export const getIngredientsBySupplierID = async (req, res) => {
    const { id } = req.params;
    const id_supplier = id;

    try {
        // Fetch ingredients by supplier ID
        const ingredients = await Ingredient.findAll({
            where: { id_supplier }
        });

        // Check if any ingredients were found
        if (ingredients.length > 0) {
            res.status(200).json(ingredients);
        } else {
            res.status(404).json({ message: "No ingredients found for the given supplier ID" });
        }
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
};