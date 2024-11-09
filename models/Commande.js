import database from "../config/connection.js";
import { DataTypes } from "sequelize";
import Utilisateur from "./Utilisateur.js";

const Commande = database.define('Commande', {
    id_commande: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_client: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,
            key: 'id_utilisateur',
        },
    },
    date_commande: DataTypes.DATE,
    prix_total: DataTypes.DECIMAL,
    status: DataTypes.ENUM('en attente', 'préparée', 'ramassée', 'annulée'),
    reservation: DataTypes.BOOLEAN,
    date_collecte: DataTypes.DATE,
}, {
    timestamps: false,
});

export default Commande;
