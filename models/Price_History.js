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
            model: 'Products',
            key: 'id_product',
        }
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,  // Ne permet pas les valeurs nulles
        validate: {
            notNull: { msg: 'Price cannot be null' }, // Message d'erreur personnalisé
            isDecimal: { msg: 'Price must be a valid decimal number' }
        }
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