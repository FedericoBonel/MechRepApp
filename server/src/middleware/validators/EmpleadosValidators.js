// Importaciones
const expressValidator = require("express-validator");

const checkValidator = require("./CheckValidation");
const validationValues = require("../../utils/constants/validation/EmpleadosValidation");
const validationMsgs = require("../../utils/constants/messages/EmpleadosValidation");

// Definicion de constantes
const PAIS_VALIDO = process.env.PAIS_VALIDO || "Argentina";

/**
 * Validador del cuerpo de un nuevo empleado
 */
const newEmpleadoBodyValidator = [
    expressValidator
        .body("_id")
        .not()
        .exists()
        .withMessage(validationMsgs.ID_PROVIDED),
    expressValidator
        .body("nombres")
        .isString()
        .withMessage(validationMsgs.NOMBRES_NOT_PROVIDED)
        .isLength({
            min: validationValues.NOMBRES_MIN_LENGTH,
            max: validationValues.NOMBRES_MAX_LENGTH,
        })
        .withMessage(validationMsgs.NOMBRES_INVALID_LENGTH)
        .toLowerCase(),
    expressValidator
        .body("apellidos")
        .isString()
        .withMessage(validationMsgs.APELLIDOS_NOT_PROVIDED)
        .isLength({
            min: validationValues.APELLIDOS_MIN_LENGTH,
            max: validationValues.APELLIDOS_MAX_LENGTH,
        })
        .withMessage(validationMsgs.APELLIDOS_INVALID_LENGTH)
        .toLowerCase(),
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
        .body("password")
        .isString()
        .withMessage(validationMsgs.CLAVE_NOT_PROVIDED)
        .isLength({
            min: validationValues.PASSWORD_MIN_LENGTH,
            max: validationValues.PASSWORD_MAX_LENGTH,
        })
        .withMessage(validationMsgs.CLAVE_INVALID),
    expressValidator
        .body("cargo")
        .isString()
        .withMessage(validationMsgs.CARGO_NOT_PROVIDED),
    expressValidator
        .body("direccion")
        .exists({ checkFalsy: true })
        .withMessage(validationMsgs.DIRECCION_NOT_PROVIDED),
    expressValidator
        .body("direccion.pais")
        .isString()
        .withMessage(validationMsgs.PAIS_NOT_PROVIDED)
        .toLowerCase()
        .equals(PAIS_VALIDO.toLowerCase())
        .withMessage(validationMsgs.PAIS_NOT_VALID),
    expressValidator
        .body("direccion.ciudad")
        .isString()
        .withMessage(validationMsgs.CIUDAD_NOT_PROVIDED)
        .isLength({
            min: validationValues.CIUDAD_MIN_LENGTH,
            max: validationValues.CIUDAD_MAX_LENGTH,
        })
        .withMessage(validationMsgs.CIUDAD_NOT_VALID),
    expressValidator
        .body("direccion.calle")
        .isString()
        .withMessage(validationMsgs.CALLE_NOT_PROVIDED)
        .isLength({
            min: validationValues.CALLE_MIN_LENGTH,
            max: validationValues.CALLE_MAX_LENGTH,
        })
        .withMessage(validationMsgs.CALLE_NOT_VALID),
    expressValidator
        .body("direccion.numero")
        .isNumeric({
            min: validationValues.NUMERO_MIN_VALUE,
            max: validationValues.NUMERO_MAX_VALUE,
        })
        .withMessage(validationMsgs.NUMERO_NOT_PROVIDED),
    expressValidator
        .body("fechaNacimiento")
        .isISO8601({ strict: true })
        .withMessage(validationMsgs.FECHA_NACIMIENTO_NOT_PROVIDED)
        .custom((date) => {
            const validDate = new Date();
            validDate.setFullYear(
                validDate.getFullYear() -
                    validationValues.MIN_VALUE_YEARS_BIRTHDATE
            );
            return new Date(date).getTime() <= validDate.getTime();
        })
        .withMessage(validationMsgs.FECHA_NACIMIENTO_NOT_VALID),
    checkValidator,
];

module.exports = { newEmpleadoBodyValidator };
