import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Categorie_Produit = database.define('Categorie_Produit', {
    id_categorie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_categorie: DataTypes.STRING,
    description_categorie: DataTypes.STRING,
});

export default Categorie_Produit;