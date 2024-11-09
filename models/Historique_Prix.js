import database from "../config/connection.js";
import { DataTypes } from "sequelize";
import Produit from "./Produit.js";

const Historique_Prix = database.define('Historique_Prix', {
    id_historique_prix: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_produit: {
        type: DataTypes.INTEGER,
        references: {
            model: Produit,
            key: 'id_produit',
        },
    },
    ancien_prix: DataTypes.DECIMAL,
    nouveau_prix: DataTypes.DECIMAL,
    date_changement: DataTypes.DATE,
}, {
    timestamps: false,
});

export default Historique_Prix;