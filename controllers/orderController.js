import { Order, Order_Product, Product } from '../relationships/Relations.js'
import { Op } from 'sequelize';

export const getOrders = async (req, res) => {
    const { page = 1, limit = 10, ...filters } = req.query;

    try {
        const offset = (page - 1) * limit;
        const where = {};

        for (const [key, value] of Object.entries(filters)) {
            if (Order.rawAttributes[key]) {
                where[key] = {
                    [Op.like]: `%${value}%`
                };
            }
        }

        const result = await Order.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.status(200).json({
            data: result.rows,
            total: result.count,
            page: parseInt(page),
            pages: Math.ceil(result.count / limit)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
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
    // Retrieve the order ID from the request parameters
    const { id } = req.params;

    try {
        // Delete the order where the id matches
        const deletedRows = await Order.destroy({
            where: { id_order: id }
        });

        // Check if any rows were deleted
        if (deletedRows > 0) {
            res.status(200).json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        // In case of error
        console.log('Error code:', error);
        res.status(400).json({ message: error.message });
    }
};

export const createOrder = async (req, res) => {
    const orders = req.body;

    // Validate input
    if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ message: "No orders provided or invalid data format." });
    }

    try {
        const createdOrders = [];

        for (const order of orders) {
            const { id_user, products, pickup_date } = order;

            // Validate required fields
            if (!id_user || !Array.isArray(products) || products.length === 0) {
                console.log("Missing id_user or products in order:", order);
                continue;
            }

            // Calculate total price
            let total_price = 0;

            for (const product of products) {
                const { id_product, quantity } = product;

                if (!id_product || !quantity) {
                    console.log("Missing id_product or quantity for product:", product);
                    continue;
                }

                const productData = await Product.findByPk(id_product);

                if (!productData) {
                    console.log("Product not found:", id_product);
                    continue;
                }

                total_price += productData.product_price * quantity;
            }

            // Create the order
            const newOrder = await Order.create({
                id_user,
                order_date: new Date(),
                total_price,
                status: 'in process',
                reservation: false,
                pickup_date
            });

            console.log('Order created:', newOrder);

            for (const product of products) {
                const { id_product, quantity } = product;

                await Order_Product.create({
                    id_order: newOrder.id_order,
                    id_product,
                    quantity
                });

                console.log('Product added to order:', { id_order: newOrder.id_order, id_product, quantity });
            }

            createdOrders.push({
                id_order: newOrder.id_order,
                id_user: newOrder.id_user,
                order_date: newOrder.order_date,
                total_price: newOrder.total_price,
                status: newOrder.status,
                reservation: newOrder.reservation,
                pickup_date: newOrder.pickup_date,
                products
            });
        }

        res.status(201).json({ data: createdOrders, message: "Orders created successfully" });
    } catch (error) {
        console.error('Error during order creation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getProductInfoByOrderId = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the order by its primary key (id)
        const order = await Order.findByPk(id);
        console.log("produits", order)
        // Get all products associated with the order
        const products = await order.getProducts();

        res.status(200).json({ data: products });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateOrder = async (req, res) => {
    // Retrieve the order ID from the request parameters
    const { id } = req.params;
    // Retrieve the updated order information from the request body
    const updatedData = req.body;

    try {
        // Update the order with the provided data where the id matches
        const [updatedRows] = await Order.update(updatedData, {
            where: { id_order: id }
        });

        // Check if any rows were updated
        if (updatedRows > 0) {
            res.status(200).json({ message: "Order updated successfully" });
        } else {
            res.status(404).json({ message: "Order not found or no changes made" });
        }
    } catch (error) {
        // In case of error
        console.log('Error code : ' + error);
        res.status(400).json({ message: error.message });
    }
};

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
        const orderProduct = await Order_Product.findOne({ where: { id_order: orderId, id_product: productId } });
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