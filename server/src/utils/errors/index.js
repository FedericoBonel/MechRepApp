/**
 * Indice para facilitar importaciones desde otros paquetes
 */
const NotFoundError = require("./NotFoundError");
const UnauthorizedError = require("./UnauthorizedError");
const BadRequestError = require("./BadRequest");
const ApiError = require("./ApiError");
const InternalServerError = require("./ServerError");

module.exports = {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ApiError,
    InternalServerError,
};
