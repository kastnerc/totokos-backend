import database from "../config/database.js";
import { DataTypes } from "sequelize";

const Supplier = database.define('Supplier', {
    id_supplier: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    supplier_name: DataTypes.STRING,
    supplier_address: DataTypes.STRING,
    telephone_contact: DataTypes.STRING,
    supplier_email: DataTypes.STRING,
});

export default Supplier;