// Importaciones
const { NotFoundError } = require("../utils/errors");

const middlewareMsgs = require("../utils/constants/messages/MiddlewareErrors");

/**
 * Middleware que maneja todas las requests que no han podido ser controladas
 * porque no encontraron una ruta que se corresponda con la suya
 * @throws {NotFoundError} Siempre que es ejecutado
 */
const pathNotFound = async (req, res) => {
    throw new NotFoundError(`${middlewareMsgs.PATH_NOT_FOUND}${req.path}`);
};

module.exports = pathNotFound;
