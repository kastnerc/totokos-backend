import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Utilisateur = database.define('Utilisateur', {
    id_utilisateur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_utilisateur: DataTypes.STRING,
    motDePasse: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    info_contact: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    role: DataTypes.STRING,
    date_creation: DataTypes.DATE,
    date_derniere_connexion: DataTypes.DATE,
    adresse: DataTypes.STRING,
    ville: DataTypes.STRING,
    province: DataTypes.STRING,
    pays: DataTypes.STRING,
    code_postale: DataTypes.STRING,
});

export default Utilisateur;