const { StatusCodes } = require("http-status-codes");
const ApiError = require("./ApiError");

/**
 * Abstraccion de un error de tipo Internal server error, 
 * establece el status http del error como 500.
 * Estos errores se deben a que se ha generado un error en el servidor.
 */
class ServerError extends ApiError {

    /**
     * Construye un nuevo error de la API de tipo Internal Server Error para marcar que ha sucedido un error en el servidor
     * @param {String} message Mensaje opcional que explica el error, de no proveerse se asigna a "Internal Server Error!"
     */
    constructor(message) {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = ServerError;
