import express from "express";
import cors from 'cors'
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from 'dotenv'

//Creation du serveur
const app = express()

//Utiliser les librairies
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Creation de toutes les tables
// database.sync({ force:true })

//Demarrer les serveur
const PORT = dotenv.config().parsed.PORT

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))