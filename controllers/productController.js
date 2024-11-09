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

// Get all products by category

// Get all ingredients by product