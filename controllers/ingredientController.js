import { Ingredient } from '../relationships/relations.js'

// Get all ingredients
export const getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.findAll()
        res.status(200).json(ingredients)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Get an ingredient by id
export const getIngredientById = async (req, res) => {
    const { id } = req.params
    try {
        const ingredient = await Ingredient.findByPk(id)
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Add an ingredient
export const addIngredient = async (req, res) => {
    const { name, stock, unit, price } = req.body
    try {
        const ingredient = await Ingredient.create({ name, stock, unit, price })
        res.status(201).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Update an ingredient
export const updateIngredient = async (req, res) => {
    const { id } = req.params
    const { name, stock, unit, price } = req.body
    try {
        const ingredient = await Ingredient.update({ name, stock, unit, price }, { where: { id } })
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Delete an ingredient
export const deleteIngredient = async (req, res) => {
    const { id } = req.params
    try {
        const ingredient = await Ingredient.destroy({ where: { id } })
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Get all ingredients by product
