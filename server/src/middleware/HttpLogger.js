// Importaciones
const morgan = require("morgan");

// Definicion de constantes
const FORMAT = "tiny";

// Loggeador de solicitudes HTTP
const logger = morgan(FORMAT);

module.exports = logger;
