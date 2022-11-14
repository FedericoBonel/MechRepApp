// Importaciones
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const ApiError = require("./ApiError");

/**
 * Abstraccion de un error de tipo Unauthorized, 
 * establece el status http del error como 401.
 * Estos errores se deben a que el usuario no ha proveido credenciales validas para el recurso requerido.
 */
class UnauthorizedError extends ApiError {

    /**
     * Construye un nuevo error de la API de tipo Unauthorized Error para marcar que el usuario de la API no ha proveido credenciales validas
     * @param {String} message Mensaje opcional que explica el error, de no proveerse se asigna a "Unauthorized!"
     */
    constructor(message = ReasonPhrases.UNAUTHORIZED) {
        super(message);
        this.status = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthorizedError;
