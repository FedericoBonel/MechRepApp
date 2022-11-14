// Importaciones
const { StatusCodes } = require("http-status-codes");
const { ApiError } = require("../errors");

const ApiResBody = require("./ApiResBody");

/**
 * Abstrae al cuerpo de una respuesta erronea
 * Asigna el valor de exito a falso y agrega un campo con los errores encontrados
 */
class ErrorPayload extends ApiResBody {
    /**
     * Construye un cuerpo de respuesta erronea para la api con el error a ser devuelto
     * @param {ApiError} error Error a ser devuelto, de ser de tipo "BAD_REQUEST" se agregara un campo "errors" con los errores en el request recibido
     */
    constructor(error) {
        super(false);
        this.errorMsg = error.message;
        if (error.status === StatusCodes.BAD_REQUEST && error.errors?.length) {
            this.errors = error.errors;
        }
    }
}

module.exports = ErrorPayload;
