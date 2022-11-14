// Importaciones
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const ApiError = require("./ApiError");

/**
 * Abstraccion de un error de tipo Not Found, 
 * establece el status http del error como 404.
 * Estos errores se deben a que el request ha pedido acceso a un recurso no existente.
 */
class NotFoundError extends ApiError {

    /**
     * Construye un nuevo error de la API de tipo Not Found para marcar requests que fueron han pedido acceso a un recurso no existente.
     * @param {String} message Mensaje opcional que explica el error, de no proveerse se asigna a "Not Found!"
     */
    constructor(message = ReasonPhrases.NOT_FOUND) {
        super(message);
        this.status = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;
