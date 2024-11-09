import database from "../config/database.js";
import { DataTypes } from "sequelize";
import Product from "./Product.js";

const Price_History = database.define('Price_History', {
    id_price_history: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_product: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id_product',
        },
    },
    old_price: DataTypes.DECIMAL,
    new_price: DataTypes.DECIMAL,
    change_date: DataTypes.DATE,
}, {
    timestamps: false,
});

export default Price_History;