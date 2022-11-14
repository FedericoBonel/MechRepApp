// Express imports
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");

const connectToDB = require("./src/database/Connect");

// Definicion de constantes

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// App creation
const app = express();

// Configuracion del servidor
app.use(cors());

// Pre-routing middleware
app.use(express.json());

// Enrutamiento de solicitudes

// Control de errores

// Funcion que inicializa el servidor y la conexion con la base de datos
const startServer = async () => {
    try {
        await connectToDB(MONGODB_URI);
        app.listen(PORT, () =>
            console.log(`Servidor escuchando en puerto ${PORT}...`)
        );
    } catch (error) {
        console.log(
            `A sucedido un error durante la inicializacion del servidor: ${error}`
        );
    }
};

startServer();