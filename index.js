import express from "express";
import cors from 'cors'
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from 'dotenv'

// Start the connection
const app = express()

// Use of middlewares
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Creation of the tables
// database.sync({ force:true })

// Import of the routes

// Start the server
const PORT = dotenv.config().parsed.PORT

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))