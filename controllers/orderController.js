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
        const order = await Order.destroy({ where: { id_order: id } })
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const createOrder = async (req, res) => {
    // Retrieve the new orders' information (array of order objects)
    const orders = req.body;

    // Validate if the input is an array and it's not empty
    if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ message: "No orders provided or invalid data format." });
    }

    try {
        // Create each order and associate products
        const createdOrders = [];
        for (const order of orders) {
            const { id_client, products, pickup_date } = order;

            // Validate presence of id_client and products
            if (!id_client || !Array.isArray(products) || products.length === 0) {
                console.log("Missing id_client or products in order:", order);
                continue; // Skip this order if missing required fields
            }

            // Calculate the total price of the order
            let total_price = 0;
            for (const product of products) {
                const { id_product, quantity } = product;

                // Validate required fields for each product
                if (!id_product || !quantity) {
                    console.log("Missing productId or quantity for product:", product);
                    continue; // Skip this product if any required fields are missing
                }

                // Fetch the product price
                const productData = await Product.findByPk(id_product);
                if (!productData) {
                    console.log("Product not found:", id_product);
                    continue; // Skip this product if not found
                }

                total_price += productData.product_price * quantity;
            }

            // Create the order with the id_client, order_date, total_price, and pickup_date
            const newOrder = await Order.create({
                id_client,
                order_date: new Date(),
                total_price,
                status: 'in process',
                reservation: false,
                pickup_date
            });

            console.log('Order created:', newOrder);

            // Add each product to the order
            for (const product of products) {
                const { id_product, quantity } = product;

                // Add the product to the order
                await Order_Product.create({
                    id_order: newOrder.id_order,
                    id_product,
                    quantity
                });

                console.log('Product added to order:', { id_order: newOrder.id_order, id_product, quantity });
            }

            // Add the created order to the response
            createdOrders.push({
                id_order: newOrder.id_order,
                id_client: newOrder.id_client,
                order_date: newOrder.order_date,
                total_price: newOrder.total_price,
                status: newOrder.status,
                reservation: newOrder.reservation,
                pickup_date: newOrder.pickup_date,
                products: products
            });
        }

        // Respond with the created orders
        res.status(201).json({ data: createdOrders, message: "Orders created successfully" });
    } catch (error) {
        console.log('Error during order creation:', error);
        res.status(500).json({ message: error.message });
    }
};

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
    const { id } = req.params
    const updatedOrder = req.body
    try {
        // Update the order with the provided data where the id matches
        const order = await Order.update({ updatedOrder }, { where: { id_order: id } })
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error })
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