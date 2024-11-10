import { Order, Order_Product, Product } from '../relationships/Relations.js'

export const getOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.findAll()
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const getOrderById = async (req, res) => {
    const { id } = req.params
    try {
        // Fetch the order by its primary key (id)
        const order = await Order.findByPk(id)
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        // Delete the order where the id matches
        const order = await Order.destroy({ where: { id } })
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const createOrder = async (req, res) => {
    const { userId, products } = req.body;

    try {
        // Create a new order with the provided userId
        const order = await Order.create({ userId });
        // Add products to the order
        for (const product of products) {
            const { productId, quantity } = product;
            await Order_Product.create({
                orderId: order.id,
                productId,
                quantity
            });
        }

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProductInfoByOrderId = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Fetch the order by its primary key (id)
        const order = await Order.findByPk(orderId);
        // Get all products associated with the order
        const products = await order.getProducts();

        res.status(200).json({ data: products });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { userId, products } = req.body;

    try {
        // Fetch the order by its primary key (id)
        const order = await Order.findByPk(orderId);

        // Update the userId if provided
        if (userId) {
            order.userId = userId;
        }
        await order.save();

        // Update the products in the order
        if (products && products.length > 0) {
            await Order_Product.destroy({ where: { orderId: order.id } });
            for (const product of products) {
                const { productId, quantity } = product;
                await Order_Product.create({
                    orderId: order.id,
                    productId,
                    quantity
                });
            }
        }

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to delete a product from an order
export const deleteProductFromOrder = async (req, res) => {
    const { orderId, productId } = req.params;

    try {
        // Check if the order exists
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the product exists in the order
        const orderProduct = await Order_Product.findOne({ where: { orderId: orderId, productId: productId } });
        if (!orderProduct) {
            return res.status(404).json({ message: 'Product not found in the order' });
        }

        // Delete the product from the order
        await orderProduct.destroy();

        res.status(200).json({ message: 'Product removed from order successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};