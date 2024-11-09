import database from "../config/connection.js";
import { DataTypes } from "sequelize";
import Fournisseur from "./Fournisseur.js";

const Ingredient = database.define('Ingredient', {
    id_ingredient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_fournisseur: {
        type: DataTypes.INTEGER,
        references: {
            model: Fournisseur,
            key: 'id_fournisseur',
        },
    },
    nom_ingredient: DataTypes.STRING,
    quantite_stock: DataTypes.INTEGER,
    date_expiration: DataTypes.DATE,
    prix_par_unite: DataTypes.DECIMAL,
    unite_mesure: DataTypes.STRING,
});

export default Ingredient;