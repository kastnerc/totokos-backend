import { Product, Ingredient, Ingredient_Product, Price_History } from '../relationships/Relations.js'

// Get all products (only the product_name and the product_price)
export const getProducts = async (req, res) => {
    try {
        // Fetch all products with only product_name and product_price attributes
        const products = await Product.findAll({
            attributes: ['product_name', 'product_price']
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
    const products = req.body;

    if (Array.isArray(products)) {
        // Handle array of products
        const createdProducts = [];
        try {
            for (const product of products) {
                const { id_category, product_name, product_price, description, stock, expiry_date } = product;

                if (!id_category || !product_name || product_price == null || !description || stock == null || !expiry_date) {
                    console.log("Missing required fields for product:", product_name);
                    continue;
                }

                // Create the product
                const createdProduct = await Product.create({
                    id_category, 
                    product_name, 
                    product_price, 
                    description, 
                    stock, 
                    expiry_date
                });

                // Manually create a price history entry
                await Price_History.create({
                    id_product: createdProduct.id_product,
                    price: createdProduct.product_price,
                    date: new Date()
                });

                createdProducts.push(createdProduct);
            }
            res.status(201).json({ data: createdProducts, message: "Products successfully created" });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    } else {
        // Handle single product
        const { id_category, product_name, product_price, description, stock, expiry_date } = products;

        if (!id_category || !product_name || product_price == null || !description || stock == null || !expiry_date) {
            return res.status(400).json({ message: "Missing required fields or invalid data format." });
        }

        try {
            // Create the product
            const createdProduct = await Product.create({
                id_category, 
                product_name, 
                product_price, 
                description, 
                stock, 
                expiry_date
            });

            // Manually create a price history entry
            await Price_History.create({
                id_product: createdProduct.id_product,
                price: createdProduct.product_price,
                date: new Date()
            });

            res.status(201).json({ data: createdProduct, message: "Product successfully created" });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product_name, product_price, description, stock, expiry_date, id_category } = req.body;

    try {
        // Update the product with the provided data where the id matches
        const [updatedRows] = await Product.update(
            { product_name, product_price, description, stock, expiry_date, id_category },
            { where: { id_product: id } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Product not found or no changes made' });
        }

        // Fetch the updated product details
        const updatedProduct = await Product.findByPk(id);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found after update' });
        }

        // Manually create a price history entry
        await Price_History.create({
            id_product: updatedProduct.id_product, // Reference the updated product ID
            price: updatedProduct.product_price,
            date: new Date()
        });

        res.status(200).json({ message: 'Product updated successfully and price history recorded', data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the product exists
        const product = await Product.findByPk(id);

        if (!product) {
            // If the product is not found, return a 404 response
            return res.status(404).json({ message: 'Product not found' });
        }

        // Optionally delete associated price history records for the product
        await Price_History.destroy({ where: { id_product: id } });

        // Delete the product where the id matches
        await Product.destroy({ where: { id_product: id } });

        // Return a success message with the deleted product's details
        res.status(200).json({
            message: 'Product successfully deleted, along with associated price history entries',
            data: {
                id_product: product.id_product,
                product_name: product.product_name,
                product_price: product.product_price,
                description: product.description,
                stock: product.stock,
                expiry_date: product.expiry_date,
                id_category: product.id_category
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const listIngredientsByProductId = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('Received id_product:', id);

        // Fetch the product by its primary key (id)
        const product = await Product.findByPk(id);

        // Check if the product exists
        if (!product) {
            console.log('Product not found with id:', id_product);
            return res.status(404).json({ message: 'Product not found' });
        }

        // Get all ingredients associated with the product
        const ingredients = await product.getIngredients();

        res.status(200).json({ data: ingredients });
    } catch (error) {
        console.log('Error fetching product or ingredients:', error);
        res.status(500).json({ message: error.message });
    }
};

export const listPriceHistoryByProductId = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the product by its primary key (id)
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Get all product_price histories associated with the product
        const product_priceHistory = await Price_History.findAll({ where: { id_product: id } });

        res.status(200).json({ data: product_priceHistory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addIngredientToProduct = async (req, res) => {
    const { id_product, id_ingredient, quantity } = req.body;

    console.log('Request Body:', req.body); // Vérifiez le contenu de la requête

    try {
        const product = await Product.findByPk(id_product);
        console.log('Product fetched:', product); // Vérifiez si le produit est trouvé

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const ingredient = await Ingredient.findByPk(id_ingredient);
        console.log('Ingredient fetched:', ingredient); // Vérifiez si l’ingrédient est trouvé

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        // Add the ingredient to the product
        const ingredientProduct = await Ingredient_Product.create({
            id_product: id_product,
            id_ingredient: id_ingredient,
            quantity: quantity
        });

        res.status(201).json({ message: 'Ingredient added to product successfully', data: ingredientProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateIngredientOfProduct = async (req, res) => {
    const { id_product, id_ingredient } = req.params;
    const { quantity } = req.body;

    try {
        // Fetch the ingredient-product association by id_product and id_ingredient
        const ingredientProduct = await Ingredient_Product.findOne({
            where: {
                id_product,
                id_ingredient
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
    const { id_product, id_ingredient } = req.params;

    try {
        // Fetch the ingredient-product association by id_product and id_ingredient
        const ingredientProduct = await Ingredient_Product.findOne({
            where: {
                id_product,
                id_ingredient
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