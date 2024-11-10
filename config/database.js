// ORM module
import { Sequelize } from "sequelize";

// Import database information from .env
import dotenv from 'dotenv'
const ENV = dotenv.config().parsed

// console.log(ENV)


// Create the database

const database = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
    host: ENV.DB_HOST,
    // password:ENV.DB_PASSWORD,
    dialect: ENV.DB_DIALECT,
    port: ENV.DB_PORT
})

// try {
//     await database.authenticate();
//     console.log('database has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

export default database