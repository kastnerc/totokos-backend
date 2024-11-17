import database from "../config/database.js";
import { DataTypes } from "sequelize";
import Supplier from "./Supplier.js";

const Ingredient = database.define('Ingredient', {
    id_ingredient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_ingredient'
    },
    id_supplier: {
        type: DataTypes.INTEGER,
        references: {
            model: Supplier,
            key: 'id_supplier',
        },
    },
    ingredient_name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE,
    price_per_unit: DataTypes.DECIMAL,
    unit_measure: DataTypes.STRING,
});

export default Ingredient;