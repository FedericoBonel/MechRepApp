// Importaciones
const { StatusCodes } = require("http-status-codes");

const { ApiError } = require("../utils/errors");
const { ErrorResBody } = require("../utils/responsebodies");
const middlewareMsgs = require("../utils/constants/messages/MiddlewareErrors");

/**
 * Middleware que recibe todos los errores que suceden
 * dentro de funciones asincronas en el servidor
 * y los devuelve como respuestas HTTP al usuario de la API
 */
const errorHandler = async (err, res, req, next) => {
    // Verifica si el error es de api o no y devolvelo al cliente
    let customError = err;

    if (err.name === "CastError") {
        customError = new ApiError(
            `${middlewareMsgs.ENTITY_NOT_FOUND}${err.value}`,
            StatusCodes.NOT_FOUND
        );
    } else if (!customError.status) {
        customError = new ApiError(
            err.message || middlewareMsgs.DEFAULT_SERVER_ERROR,
            err.status || StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
    req.status(customError.status).json(new ErrorResBody(customError));
};

module.exports = errorHandler;
