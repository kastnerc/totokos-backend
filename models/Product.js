import database from "../config/database.js";
import { DataTypes } from "sequelize";
import Product_Category from './Product_Category.js';
import Price_History from './Price_History.js';

const Product = database.define('Product', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_product'
    },
    id_category: {
        type: DataTypes.INTEGER,
        references: {
            model: Product_Category,
            key: 'id_category',
        },
    },
    product_name: DataTypes.STRING,
    product_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE,
});

export default Product;