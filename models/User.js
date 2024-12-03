import database from "../config/database.js";
import { DataTypes } from "sequelize";

const User = database.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    contact_info: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    role: DataTypes.STRING,
    last_connection_date: DataTypes.DATE,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    image: {
        type: DataTypes.STRING, // Chemin ou URL de l'image
        allowNull: true,
    },
});

export default User;