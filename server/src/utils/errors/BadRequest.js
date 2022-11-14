// Importaciones
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const ApiError = require("./ApiError");

/**
 * Abstraccion de un error de tipo Bad Request,
 * establece el status http del error como 400.
 * Estos errores se deben a que hay algo incorrecto en el request y el usuario deberia arreglarlo
 */
class BadRequestError extends ApiError {
    /**
     * Construye un nuevo error de la API de tipo Bad Request para marcar requests que fueron incorrectas por algun motivo
     * @param {String} message Mensaje opcional que explica el error, de no proveerse se asigna a "Bad Request"
     * @param {[*]} errors Atributo opcional que contiene los campos del request que son incorrectos
     */
    constructor(message = ReasonPhrases.BAD_REQUEST, errors = []) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
        this.errors = errors;
    }
}

module.exports = BadRequestError;
