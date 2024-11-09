import database from "../config/connection.js";
import { DataTypes } from "sequelize";
import Ingredient from "./Ingredient.js";
import Produit from "./Produit.js";

const Ingredient_Produit = database.define('Ingredient_Produit', {
    id_ingredient: {
        type: DataTypes.INTEGER,
        references: {
            model: Ingredient,
            key: 'id_ingredient',
        },
    },
    id_produit: {
        type: DataTypes.INTEGER,
        references: {
            model: Produit,
            key: 'id_produit',
        },
    },
    quantite: DataTypes.DECIMAL,
});

export default Ingredient_Produit;