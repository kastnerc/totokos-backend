import { Product_Category } from '../relationships/Relations.js'


export const getProductCategories = async (req, res) => {
    try {
        // Fetch all product categories from the database
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
        // Fetch the product category by its primary key (id)
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
        // Create a new product category with the provided data
        const product_category = await Product_Category.create({ category_name, category_description })
        res.status(201).json(product_category)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const updateProductCategory = async (req, res) => {
    const { id } = req.params
    const { category_name, category_description } = req.body
    try {
        // Update the product category with the provided data where the id matches
        const product_category = await Product_Category.update({ category_name, category_description }, { where: { id } })
        res.status(200).json(product_category)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const deleteProductCategory = async (req, res) => {
    const { id } = req.params
    try {
        // Delete the product category where the id matches
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
        // Fetch the category by its primary key (id)
        const category = await Product_Category.findByPk(categoryId);
        // Get all products associated with the category
        const products = await category.getProducts();

        res.status(200).json({ data: products });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}