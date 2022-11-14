// Importaciones
const expressValidator = require("express-validator");

const { BadRequestError } = require("../../utils/errors");
const middlewareMsgs = require("../../utils/constants/messages/MiddlewareErrors");

/**
 * Verifica la validacion llevada a cabo por express validator,
 * si alguna de las verificaciones falla, lanza un error
 */
const checkValidation = async (req, res, next) => {
    const validationResult = expressValidator.validationResult(req);

    if (!validationResult.isEmpty()) {
        throw new BadRequestError(
            middlewareMsgs.BODY_VALIDATION_FAILED,
            validationResult.array().map((err) => ({
                msg: err.msg,
                errorField: err.param,
                location: err.location,
            }))
        );
    }

    next();
};

module.exports = checkValidation;
