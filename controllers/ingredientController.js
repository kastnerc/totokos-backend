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
    const { name, stock, unit, price } = req.body
    try {
        // Create a new ingredient with the provided data
        const ingredient = await Ingredient.create({ name, stock, unit, price })
        res.status(201).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const updateIngredient = async (req, res) => {
    const { id } = req.params
    const { name, stock, unit, price } = req.body
    try {
        // Update the ingredient with the provided data where the id matches
        const ingredient = await Ingredient.update({ name, stock, unit, price }, { where: { id } })
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const deleteIngredient = async (req, res) => {
    const { id } = req.params
    try {
        // Delete the ingredient where the id matches
        const ingredient = await Ingredient.destroy({ where: { id } })
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

