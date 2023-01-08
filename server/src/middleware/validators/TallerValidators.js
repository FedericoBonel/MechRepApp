// Importaciones
const expressValidator = require("express-validator");

const checkValidator = require("./CheckValidation");
const validationValues = require("../../utils/constants/validation/TallerValidation");
const validationMsgs = require("../../utils/constants/messages/TallerValidation");
const direccionValidationValues = require("../../utils/constants/validation/PersonasValidation");
const direccionValidationMsgs = require("../../utils/constants/messages/PersonasValidation");

// Definicion de constantes
const PAIS_VALIDO = process.env.PAIS_VALIDO || "Argentina";

/**
 * Validador del cuerpo de un nuevo taller
 */
const newTallerBodyValidator = [
    expressValidator
        .body("nombre")
        .isString()
        .withMessage(validationMsgs.NOMBRE_NOT_PROVIDED)
        .isLength({
            min: validationValues.TALLER_NOMBRE_MIN_LENGTH,
            max: validationValues.TALLER_NOMBRE_MAX_LENGTH,
        })
        .withMessage(validationMsgs.NOMBRE_NOT_VALID),
    expressValidator
        .body("direccion")
        .exists({ checkFalsy: true })
        .withMessage(direccionValidationMsgs.DIRECCION_NOT_PROVIDED),
    expressValidator
        .body("direccion.pais")
        .isString()
        .withMessage(direccionValidationMsgs.PAIS_NOT_PROVIDED)
        .toLowerCase()
        .equals(PAIS_VALIDO.toLowerCase())
        .withMessage(direccionValidationMsgs.PAIS_NOT_VALID),
    expressValidator
        .body("direccion.ciudad")
        .isString()
        .withMessage(direccionValidationMsgs.CIUDAD_NOT_PROVIDED)
        .isLength({
            min: direccionValidationValues.CIUDAD_MIN_LENGTH,
            max: direccionValidationValues.CIUDAD_MAX_LENGTH,
        })
        .withMessage(direccionValidationMsgs.CIUDAD_NOT_VALID),
    expressValidator
        .body("direccion.calle")
        .isString()
        .withMessage(direccionValidationMsgs.CALLE_NOT_PROVIDED)
        .isLength({
            min: direccionValidationValues.CALLE_MIN_LENGTH,
            max: direccionValidationValues.CALLE_MAX_LENGTH,
        })
        .withMessage(direccionValidationMsgs.CALLE_NOT_VALID),
    expressValidator
        .body("direccion.numero")
        .isNumeric({
            min: direccionValidationValues.NUMERO_MIN_VALUE,
            max: direccionValidationValues.NUMERO_MAX_VALUE,
        })
        .withMessage(direccionValidationMsgs.NUMERO_NOT_PROVIDED),
    expressValidator
        .body("telefono")
        .isString()
        .withMessage(validationMsgs.TELEFONO_NOT_PROVIDED)
        .isMobilePhone("es-AR")
        .withMessage(validationMsgs.TELEFONO_INVALID)
        .isLength({
            min: validationValues.TELEFONO_LENGTH,
            max: validationValues.TELEFONO_LENGTH,
        })
        .withMessage(validationMsgs.TELEFONO_INVALID),
    expressValidator
        .body("email")
        .isEmail()
        .withMessage(validationMsgs.EMAIL_NOT_VALID)
        .isLength({
            min: validationValues.EMAIL_MIN_LENGTH,
            max: validationValues.EMAIL_MAX_LENGTH,
        })
        .withMessage(validationMsgs.EMAIL_INVALID_LENGTH)
        .toLowerCase(),
    checkValidator,
];

module.exports = { newTallerBodyValidator };
