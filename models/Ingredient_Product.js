import database from "../config/database.js";
import { DataTypes } from "sequelize";
import Ingredient from "./Ingredient.js";
import Product from "./Product.js";

const Ingredient_Product = database.define('Ingredient_Product', {
    id_ingredient: {
        type: DataTypes.INTEGER,
        references: {
            model: Ingredient,
            key: 'id_ingredient',
        },
    },
    id_product: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id_product',
        },
    },
    quantity: DataTypes.DECIMAL,
});

export default Ingredient_Product;