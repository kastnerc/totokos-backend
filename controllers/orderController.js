import { Order } from '../relationships/relations.js'

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll()
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Get an order by id
export const getOrderById = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findByPk(id)
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Delete an order
export const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.destroy({ where: { id } })
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
export const createOrder = async (req, res) => {
    const { userId, products } = req.body;

    try {
        const order = await Order.create({ userId });
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
export const getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order by ID
        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: Order_Product,
                    include: [Product]
                }
            ]
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ data: order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export const getProductInfoByOrderId = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findByPk(orderId);
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
        const order = await Order.findByPk(orderId);

        if (userId) {
            order.userId = userId;
        }
        await order.save();
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