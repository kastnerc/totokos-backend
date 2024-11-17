import database from "../config/database.js";
import { DataTypes } from "sequelize";

const Price_History = database.define('Price_History', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id_product',
        },
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false,
});

export default Price_History;
