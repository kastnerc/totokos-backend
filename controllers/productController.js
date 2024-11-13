import { Product, Ingredient, Ingredient_Product } from '../relationships/Relations.js'

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
    // Vérification si req.body.products est un tableau valide
    const products = req.body.products;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "No products provided or invalid data format." });
    }

    try {
        const createdProducts = [];
        for (const product of products) {
            const { product_name, product_price, description, stock, expiry_date, id_category } = product;

            // Validation des champs nécessaires pour chaque produit
            if (!product_name || product_price == null || stock == null || !id_category) {
                console.log("Missing required fields for product:", product_name);
                continue; // Sauter ce produit si des champs sont manquants
            }

            // Créer le produit dans la base de données
            const result = await Product.create({ product_name, product_price, description, stock, expiry_date, id_category });
            createdProducts.push(result);
        }

        res.status(201).json({ data: createdProducts, message: "Products successfully created" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product_name, product_price, description, stock, expiry_date, id_category } = req.body;
    try {
        // Update the product with the provided data where the id matches
        const product = await Product.update({ product_name, product_price, description, stock, expiry_date, id_category }, { where: { id_product: id } });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Delete the product where the id matches
        const product = await Product.destroy({ where: { id_product: id } });
        res.status(200).json(product);
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

        // Get all product_price histories associated with the product
        const product_priceHistory = await product.getproduct_price_Histories();

        res.status(200).json({ data: product_priceHistory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addIngredientToProduct = async (req, res) => {
    const { productId, ingredientId, quantity } = req.body;

    console.log('Request Body:', req.body); // Vérifiez le contenu de la requête

    try {
        const product = await Product.findByPk(productId);
        console.log('Product fetched:', product); // Vérifiez si le produit est trouvé

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const ingredient = await Ingredient.findByPk(ingredientId);
        console.log('Ingredient fetched:', ingredient); // Vérifiez si l’ingrédient est trouvé

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        const ingredientProduct = await Ingredient_Product.create({
            productId: product.id_product,
            ingredientId: ingredient.id_ingredient,
            quantity
        });

        res.status(201).json({ message: 'Ingredient added to product successfully', data: ingredientProduct });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

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