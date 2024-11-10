import database from "../config/database.js";
import { DataTypes } from "sequelize";
import Order from "./Order.js";
import Product from "./Product.js";

const Order_Product = database.define('Order_Product', {
    id_order: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'id_order',
        },
        primaryKey: true,
    },
    id_product: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id_product',
        },
        primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL,
    total_price: DataTypes.DECIMAL,
}, {
    indexes: [
        {
            unique: true,
            fields: ['id_order', 'id_product'],
            name: 'unique_order_product'
        }
    ]
});

export default Order_Product;