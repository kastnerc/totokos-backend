import database from "../config/database.js";
import { DataTypes } from "sequelize";

const Product_Category = database.define('Product_Category', {
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: DataTypes.STRING,
    category_description: DataTypes.STRING,
});

export default Product_Category;