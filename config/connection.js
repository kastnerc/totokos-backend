// Module de traduction (ORM)
import { Sequelize } from "sequelize";

//Importer les informations de la base de donnees (.env)
import dotenv from 'dotenv'
const ENV = dotenv.config().parsed

// console.log(ENV)

//Creation de la connection

const connection = new Sequelize(ENV.DB_NAME,ENV.DB_USER, ENV.DB_PASSWORD, {
    host:ENV.DB_HOST,
    // password:ENV.DB_PASSWORD,
    dialect:ENV.DB_DIALECT,
    port:ENV.DB_PORT
})

// try {
//     await connection.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

export default connection