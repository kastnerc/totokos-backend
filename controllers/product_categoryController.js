import { Product_Category } from '../relationships/relations.js'

// Get all product categories
export const getProductCategories = async (req, res) => {
    try {
        const product_categories = await Product_Category.findAll()
        res.status(200).json(product_categories)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Get a product category by id
export const getProductCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const product_category = await Product_Category.findByPk(id)
        res.status(200).json(product_category)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Add a product category
export const addProductCategory = async (req, res) => {
    const { category_name, category_description } = req.body
    try {
        const product_category = await Product_Category.create({ category_name, category_description })
        res.status(201).json(product_category)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Update a product category
export const updateProductCategory = async (req, res) => {
    const { id } = req.params
    const { category_name, category_description } = req.body
    try {
        const product_category = await Product_Category.update({ category_name, category_description }, { where: { id } })
        res.status(200).json(product_category)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Delete a product category
export const deleteProductCategory = async (req, res) => {
    const { id } = req.params
    try {
        const product_category = await Product_Category.destroy({ where: { id } })
        res.status(200).json(product_category)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
export const listProductsByCategory = async (req, res) => {
    // Retrieve the category ID from the URL
    const { categoryId } = req.params;

    try {
        const category = await Product_Category.findByPk(categoryId);

        const products = await category.getProducts();

        res.status(200).json({ data: products });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}