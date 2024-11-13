import database from "../config/database.js";
import { DataTypes } from "sequelize";
import Product_Category from './Product_Category.js';
import Price_History from './Price_History.js';

const Product = database.define('Product', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_product' // Si la base utilise des underscores
    },
    id_category: {
        type: DataTypes.INTEGER,
        references: {
            model: Product_Category,
            key: 'id_category',
        },
    },
    product_name: DataTypes.STRING,
    product_price: { // Vérifiez ici
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE,
}, {
    hooks: {
        afterCreate: async (product, options) => {
            console.log('Product Data:', product); // Vérifiez si product_price est présent
    
            if (!product.product_price) {
                throw new Error('Product price is required to create a price history entry');
            }
    
            await Price_History.create({
                id_product: product.id_product,
                product_price: product.product_price,
                date: new Date()
            });
        }
    }
});

export default Product;