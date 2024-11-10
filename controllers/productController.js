import { Product } from '../relationships/relations.js'

// Get all products (only the name and the price)
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: ['name', 'price']
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all products (all the information)
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get a product by id
export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Add a product
export const addProduct = async (req, res) => {
    const { name, price, description, stock, expiry_date, id_category } = req.body;
    try {
        const product = await Product.create({ name, price, description, stock, expiry_date, id_category });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, stock, expiry_date, id_category } = req.body;
    try {
        const product = await Product.update({ name, price, description, stock, expiry_date, id_category }, { where: { id } });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.destroy({ where: { id } });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const listIngredientsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId);
        const ingredients = await product.getIngredients();

        res.status(200).json({ data: ingredients });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const listIngredientsByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId);

        const ingredients = await product.getIngredients();

        res.status(200).json({ data: ingredients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const listPriceHistoryByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const priceHistory = await product.getPrice_Histories();

        res.status(200).json({ data: priceHistory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    const { product_name, product_price, description, stock, expiry_date, id_category } = req.body;

    try {
        const product = await Product.create({ product_name, product_price, description, stock, expiry_date, id_category });
        res.status(201).json({ data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { product_name, product_price, description, stock, expiry_date, id_category } = req.body;

    try {
        const product = await Product.findByPk(productId);

        product.product_name = product_name;
        product.product_price = product_price;
        product.description = description;
        product.stock = stock;
        product.expiry_date = expiry_date;
        product.id_category = id_category;
        await product.save();

        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addIngredientToProduct = async (req, res) => {
    const { productId, ingredientId, quantity } = req.body;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

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
// Fonction pour mettre à jour l'ingrédient d'un produit
export const updateIngredientOfProduct = async (req, res) => {
    const { productId, ingredientId } = req.params;
    const { quantity } = req.body;

    try {
        const ingredientProduct = await Ingredient_Product.findOne({
            where: {
                productId,
                ingredientId
            }
        });
        ingredientProduct.quantity = quantity;
        await ingredientProduct.save();

        res.status(200).json({ message: 'Ingredient updated successfully', data: ingredientProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fonction pour supprimer l'ingrédient d'un produit
export const deleteIngredientFromProduct = async (req, res) => {
    const { productId, ingredientId } = req.params;

    try {
        const ingredientProduct = await Ingredient_Product.findOne({
            where: {
                productId,
                ingredientId
            }
        });

        if (!ingredientProduct) {
            return res.status(404).json({ message: 'Ingredient not found for this product' });
        }
        await ingredientProduct.destroy();

        res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}