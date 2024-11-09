import database from "../config/connection.js";
import { DataTypes } from "sequelize";
import Categorie_Produit from './Categorie_Produit.js';

const Produit = database.define('Produit', {
    id_produit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_categorie: {
        type: DataTypes.INTEGER,
        references: {
            model: Categorie_Produit,
            key: 'id_categorie',
        },
    },
    nom_produit: DataTypes.STRING,
    prix_produit: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    quantite_stock: DataTypes.INTEGER,
    date_expiration: DataTypes.DATE,
});

export default Produit;