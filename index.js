import express from "express";
import cors from 'cors'
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import database from "./config/database.js";
import ingredientRoute from "./Routes/ingredientRoute.js";
import orderRoute from "./Routes/orderRoute.js";
import product_categoryRoute from "./Routes/product_categoryRoute.js";
import productRoute from "./Routes/productRoute.js";
import supplierRoute from "./Routes/supplierRoute.js";
import userRoute from "./Routes/userRoute.js";
import authRoute from "./Routes/authRoute.js";

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
app.use('/api/ingredient', ingredientRoute)
app.use('/api/order', orderRoute)
app.use('/api/product_category', product_categoryRoute)
app.use('/api/product', productRoute)
app.use('/api/supplier', supplierRoute)
app.use('/api/user', userRoute)
app.use('/api/login', authRoute)

// Start the server
const PORT = dotenv.config().parsed.PORT

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))