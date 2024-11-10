import { Ingredient } from '../relationships/Relations.js'

export const getIngredients = async (req, res) => {
    try {
        // Fetch all ingredients from the database
        const ingredients = await Ingredient.findAll()
        res.status(200).json(ingredients)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

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
    // Retrieve the new ingredients' information (array of ingredient objects)
    const ingredients = req.body;

    // Validate if the input is an array and it's not empty
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ message: "No ingredients provided or invalid data format." });
    }

    try {
        // Create each ingredient
        const createdIngredients = [];
        for (const ingredient of ingredients) {
            const { name, stock, unit, price } = ingredient;

            // Validate presence of required fields
            if (!name || !stock || !unit || !price) {
                console.log("Missing required fields for ingredient:", ingredient);
                continue; // Skip this ingredient if any required fields are missing
            }

            // Create the ingredient with the provided data
            const newIngredient = await Ingredient.create({ name, stock, unit, price });
            createdIngredients.push(newIngredient); // Add the created ingredient to the response
        }

        // Respond with the created ingredients
        res.status(201).json({ data: createdIngredients, message: "Ingredients successfully created" });
    } catch (error) {
        console.log('Error during ingredient creation:', error);
        res.status(400).json({ message: error.message });
    }
};

export const updateIngredient = async (req, res) => {
    const { id } = req.params
    const { name, stock, unit, price } = req.body
    try {
        // Update the ingredient with the provided data where the id matches
        const ingredient = await Ingredient.update({ name, stock, unit, price }, { where: { id_ingredient: id } })
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const deleteIngredient = async (req, res) => {
    const { id } = req.params
    try {
        // Delete the ingredient where the id matches
        const ingredient = await Ingredient.destroy({ where: { id_ingredient: id } })
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

