import database from "../config/connection.js";
import { DataTypes } from "sequelize";
import Commande from "./Commande.js";
import Produit from "./Produit.js";

const Commande_Produit = database.define('Commande_Produit', {
    id_commande: {
        type: DataTypes.INTEGER,
        references: {
            model: Commande,
            key: 'id_commande',
        },
    },
    id_produit: {
        type: DataTypes.INTEGER,
        references: {
            model: Produit,
            key: 'id_produit',
        },
    },
    quantite: DataTypes.INTEGER,
    prix_unitaire: DataTypes.DECIMAL,
    prix_total_produit: DataTypes.DECIMAL,
}, {
    timestamps: false,
});

export default Commande_Produit;