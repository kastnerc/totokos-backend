import { Product, Ingredient, Ingredient_Product } from '../relationships/Relations.js'

// Get all products (only the name and the price)
export const getProducts = async (req, res) => {
    try {
        // Fetch all products with only name and price attributes
        const products = await Product.findAll({
            attributes: ['name', 'price']
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        // Fetch all products with all attributes
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the product by its primary key (id)
        const product = await Product.findByPk(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const addProduct = async (req, res) => {
    const { name, price, description, stock, expiry_date, id_category } = req.body;
    try {
        // Create a new product with the provided data
        const product = await Product.create({ name, price, description, stock, expiry_date, id_category });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, stock, expiry_date, id_category } = req.body;
    try {
        // Update the product with the provided data where the id matches
        const product = await Product.update({ name, price, description, stock, expiry_date, id_category }, { where: { id } });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Delete the product where the id matches
        const product = await Product.destroy({ where: { id } });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const listIngredientsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        // Fetch the product by its primary key (id)
        const product = await Product.findByPk(productId);
        // Get all ingredients associated with the product
        const ingredients = await product.getIngredients();

        res.status(200).json({ data: ingredients });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const listIngredientsByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        // Fetch the product by its primary key (id)
        const product = await Product.findByPk(productId);
        // Get all ingredients associated with the product
        const ingredients = await product.getIngredients();

        res.status(200).json({ data: ingredients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const listPriceHistoryByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        // Fetch the product by its primary key (id)
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Get all price histories associated with the product
        const priceHistory = await product.getPrice_Histories();

        res.status(200).json({ data: priceHistory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addIngredientToProduct = async (req, res) => {
    const { productId, ingredientId, quantity } = req.body;

    try {
        // Fetch the product by its primary key (id)
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Fetch the ingredient by its primary key (id)
        const ingredient = await Ingredient.findByPk(ingredientId);

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        // Add the ingredient to the product
        const ingredientProduct = await Ingredient_Product.create({
            productId: product.id_product,
            ingredientId: ingredient.id_ingredient,
            quantity
        });

        res.status(201).json({ message: 'Ingredient added to product successfully', data: ingredientProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateIngredientOfProduct = async (req, res) => {
    const { productId, ingredientId } = req.params;
    const { quantity } = req.body;

    try {
        // Fetch the ingredient-product association by productId and ingredientId
        const ingredientProduct = await Ingredient_Product.findOne({
            where: {
                productId,
                ingredientId
            }
        });

        // Update the quantity of the ingredient in the product
        ingredientProduct.quantity = quantity;
        await ingredientProduct.save();

        res.status(200).json({ message: 'Ingredient updated successfully', data: ingredientProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteIngredientFromProduct = async (req, res) => {
    const { productId, ingredientId } = req.params;

    try {
        // Fetch the ingredient-product association by productId and ingredientId
        const ingredientProduct = await Ingredient_Product.findOne({
            where: {
                productId,
                ingredientId
            }
        });

        if (!ingredientProduct) {
            return res.status(404).json({ message: 'Ingredient not found for this product' });
        }

        // Delete the ingredient from the product
        await ingredientProduct.destroy();

        res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}