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
    // Retrieve the new product categories' information (array of category objects)
    const categories = req.body;

    // Validate if the input is an array and it's not empty
    if (!Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ message: "No categories provided or invalid data format." });
    }

    try {
        // Create each product category
        const createdCategories = [];
        for (const category of categories) {
            const { category_name, category_description } = category;

            // Validate necessary fields
            if (!category_name || !category_description) {
                console.log("Missing required fields for category:", category_name);
                continue; // Skip this category if any field is missing
            }

            // Create the product category in the database
            const result = await Product_Category.create({ category_name, category_description });
            createdCategories.push(result);
        }

        // Respond with the created categories
        res.status(201).json({ data: createdCategories, message: "Product categories successfully created" });
    } catch (error) {
        console.log('Error during category creation:', error);
        res.status(400).json({ message: error.message });
    }
};

export const updateProductCategory = async (req, res) => {
    // Retrieve the product category ID from the request parameters
    const { id } = req.params;
    // Retrieve the updated category information from the request body
    const updatedData = req.body;

    try {
        // Update the product category with the provided data where the id matches
        const [updatedRows] = await Product_Category.update(updatedData, {
            where: { id_category: id }
        });

        // Check if any rows were updated
        if (updatedRows > 0) {
            res.status(200).json({ message: "Product category updated successfully" });
        } else {
            res.status(404).json({ message: "Product category not found or no changes made" });
        }
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
};


export const deleteProductCategory = async (req, res) => {
    // Retrieve the product category ID from the request parameters
    const { id } = req.params;

    try {
        // Delete the product category where the id matches
        const deletedRows = await Product_Category.destroy({
            where: { id_category: id }
        });

        // Check if any rows were deleted
        if (deletedRows > 0) {
            res.status(200).json({ message: "Product category deleted successfully" });
        } else {
            res.status(404).json({ message: "Product category not found" });
        }
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
};

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