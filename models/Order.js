import database from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const Order = database.define('Order', {
    id_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   
    order_date: DataTypes.DATE,
    total_price: DataTypes.DECIMAL,
    status: DataTypes.ENUM('in process', 'ready', 'picked up', 'cancelled'),
    reservation: DataTypes.BOOLEAN,
    pickup_date: DataTypes.DATE,
}, {
    timestamps: false,
});

export default Order;
