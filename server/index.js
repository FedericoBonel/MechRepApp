// Importaciones
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");

const connectToDB = require("./src/database/Connect");

// Definicion de constantes
const empleadosRouter = require("./src/routes/EmpleadosRoutes");
const cargosRouter = require("./src/routes/CargosRoutes");
const ciudadesRouter = require("./src/routes/CiudadesRoutes");

const pathNotFound = require("./src/middleware/PathNotFound");
const errorHandler = require("./src/middleware/ErrorHandler");
const httpLogger = require("./src/middleware/HttpLogger");

const PORT = process.env.PORT || 5000;
const API_BASE_URL = process.env.API_BASE_URL || "/api/v1";
const MONGODB_URI = process.env.MONGODB_URI;

// Creacion del servidor express
const app = express();

// Configuracion del servidor
app.use(cors());
app.use(httpLogger);

// Pre-routing middleware
app.use(express.json());

// Enrutamiento
app.use(`${API_BASE_URL}/empleados`, empleadosRouter);
app.use(`${API_BASE_URL}/cargos`, cargosRouter);
app.use(`${API_BASE_URL}/ciudades`, ciudadesRouter);

// Control de errores
app.use(pathNotFound);
app.use(errorHandler);

// Inicializacion del servidor
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
