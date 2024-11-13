import database from "../config/database.js";
import { DataTypes } from "sequelize";

const Price_History = database.define('Price_History', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',  // Assurez-vous que la table Products existe
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
    tableName: 'price_history',
    timestamps: false,
});

export default Price_History;
