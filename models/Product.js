import database from "../config/database.js";
import { DataTypes } from "sequelize";
import Product_Category from './Product_Category.js';
import Price_History from './Price_History.js';

const Product = database.define('Product', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_category: {
        type: DataTypes.INTEGER,
        references: {
            model: Product_Category,
            key: 'id_category',
        },
    },
    product_name: DataTypes.STRING,
    product_price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE,
}, {
    hooks: {
        afterCreate: async (product, options) => {
            await Price_History.create({
                productId: product.id_product,
                price: product.product_price,
                date: new Date()
            });
        },
        afterUpdate: async (product, options) => {
            await Price_History.create({
                productId: product.id_product,
                price: product.product_price,
                date: new Date()
            });
        }
    }
});

export default Product;