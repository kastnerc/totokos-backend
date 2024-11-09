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