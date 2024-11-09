import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Fournisseur = database.define('Fournisseur', {
    id_fournisseur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_fournisseur: DataTypes.STRING,
    adresse_fournisseur: DataTypes.STRING,
    contact_telephone: DataTypes.STRING,
    email_fournisseur: DataTypes.STRING,
});

export default Fournisseur;