// Importaciones
const expressValidator = require("express-validator");

const checkValidator = require("./CheckValidation");
const validationValues = require("../../utils/constants/validation/PersonasValidation");
const personasValidationMsgs = require("../../utils/constants/messages/PersonasValidation");
const prodValidationMsgs = require("../../utils/constants/messages/ProductividadValidation");

const { resetDaysAndHours } = require("../../utils/dates/DateFunctions");

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
        .withMessage(personasValidationMsgs.ID_PROVIDED),
    expressValidator
        .body("nombres")
        .isString()
        .withMessage(personasValidationMsgs.NOMBRES_NOT_PROVIDED)
        .isLength({
            min: validationValues.NOMBRES_MIN_LENGTH,
            max: validationValues.NOMBRES_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.NOMBRES_INVALID_LENGTH),
    expressValidator
        .body("apellidos")
        .isString()
        .withMessage(personasValidationMsgs.APELLIDOS_NOT_PROVIDED)
        .isLength({
            min: validationValues.APELLIDOS_MIN_LENGTH,
            max: validationValues.APELLIDOS_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.APELLIDOS_INVALID_LENGTH),
    expressValidator
        .body("email")
        .isEmail()
        .withMessage(personasValidationMsgs.EMAIL_NOT_VALID)
        .isLength({
            min: validationValues.EMAIL_MIN_LENGTH,
            max: validationValues.EMAIL_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.EMAIL_INVALID_LENGTH)
        .toLowerCase(),
    expressValidator
        .body("telefono")
        .isString()
        .withMessage(personasValidationMsgs.TELEFONO_NOT_PROVIDED)
        .isMobilePhone("es-AR")
        .withMessage(personasValidationMsgs.TELEFONO_INVALID)
        .isLength({
            min: validationValues.TELEFONO_LENGTH,
            max: validationValues.TELEFONO_LENGTH,
        })
        .withMessage(personasValidationMsgs.TELEFONO_INVALID),
    expressValidator
        .body("password")
        .isString()
        .withMessage(personasValidationMsgs.CLAVE_NOT_PROVIDED)
        .isLength({
            min: validationValues.PASSWORD_MIN_LENGTH,
            max: validationValues.PASSWORD_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.CLAVE_INVALID),
    expressValidator
        .body("cargo")
        .isString()
        .withMessage(personasValidationMsgs.CARGO_NOT_PROVIDED),
    expressValidator
        .body("direccion")
        .exists({ checkFalsy: true })
        .withMessage(personasValidationMsgs.DIRECCION_NOT_PROVIDED),
    expressValidator
        .body("direccion.pais")
        .isString()
        .withMessage(personasValidationMsgs.PAIS_NOT_PROVIDED)
        .toLowerCase()
        .equals(PAIS_VALIDO.toLowerCase())
        .withMessage(personasValidationMsgs.PAIS_NOT_VALID),
    expressValidator
        .body("direccion.ciudad")
        .isString()
        .withMessage(personasValidationMsgs.CIUDAD_NOT_PROVIDED)
        .isLength({
            min: validationValues.CIUDAD_MIN_LENGTH,
            max: validationValues.CIUDAD_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.CIUDAD_NOT_VALID),
    expressValidator
        .body("direccion.calle")
        .isString()
        .withMessage(personasValidationMsgs.CALLE_NOT_PROVIDED)
        .isLength({
            min: validationValues.CALLE_MIN_LENGTH,
            max: validationValues.CALLE_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.CALLE_NOT_VALID),
    expressValidator
        .body("direccion.numero")
        .isNumeric({
            min: validationValues.NUMERO_MIN_VALUE,
            max: validationValues.NUMERO_MAX_VALUE,
        })
        .withMessage(personasValidationMsgs.NUMERO_NOT_PROVIDED),
    expressValidator
        .body("fechaNacimiento")
        .isISO8601({ strict: true })
        .withMessage(personasValidationMsgs.FECHA_NACIMIENTO_NOT_PROVIDED)
        .custom((date) => {
            const validDate = new Date();
            validDate.setFullYear(
                validDate.getFullYear() -
                    validationValues.MIN_VALUE_YEARS_BIRTHDATE
            );
            return new Date(date).getTime() <= validDate.getTime();
        })
        .withMessage(personasValidationMsgs.FECHA_NACIMIENTO_NOT_VALID),
    checkValidator,
];

/**
 * Validador del cuerpo de una actualizacion de empleado
 */
const updateEmpleadoBodyValidator = [
    expressValidator
        .body("_id")
        .not()
        .exists()
        .withMessage(personasValidationMsgs.ID_PROVIDED),
    expressValidator
        .body("nombres")
        .isString()
        .withMessage(personasValidationMsgs.NOMBRES_NOT_PROVIDED)
        .isLength({
            min: validationValues.NOMBRES_MIN_LENGTH,
            max: validationValues.NOMBRES_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.NOMBRES_INVALID_LENGTH),
    expressValidator
        .body("apellidos")
        .isString()
        .withMessage(personasValidationMsgs.APELLIDOS_NOT_PROVIDED)
        .isLength({
            min: validationValues.APELLIDOS_MIN_LENGTH,
            max: validationValues.APELLIDOS_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.APELLIDOS_INVALID_LENGTH),
    expressValidator
        .body("email")
        .isEmail()
        .withMessage(personasValidationMsgs.EMAIL_NOT_VALID)
        .isLength({
            min: validationValues.EMAIL_MIN_LENGTH,
            max: validationValues.EMAIL_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.EMAIL_INVALID_LENGTH)
        .toLowerCase(),
    expressValidator
        .body("telefono")
        .isString()
        .withMessage(personasValidationMsgs.TELEFONO_NOT_PROVIDED)
        .isMobilePhone("es-AR")
        .withMessage(personasValidationMsgs.TELEFONO_INVALID)
        .isLength({
            min: validationValues.TELEFONO_LENGTH,
            max: validationValues.TELEFONO_LENGTH,
        })
        .withMessage(personasValidationMsgs.TELEFONO_INVALID),
    expressValidator
        .body("password")
        .optional({ checkFalsy: true })
        .isLength({
            min: validationValues.PASSWORD_MIN_LENGTH,
            max: validationValues.PASSWORD_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.CLAVE_INVALID),
    expressValidator
        .body("cargo")
        .isString()
        .withMessage(personasValidationMsgs.CARGO_NOT_PROVIDED),
    expressValidator
        .body("contratado")
        .isBoolean()
        .withMessage(personasValidationMsgs.CONTRATADO_NOT_PROVIDED),
    expressValidator
        .body("direccion")
        .exists({ checkFalsy: true })
        .withMessage(personasValidationMsgs.DIRECCION_NOT_PROVIDED),
    expressValidator
        .body("direccion.pais")
        .isString()
        .withMessage(personasValidationMsgs.PAIS_NOT_PROVIDED)
        .toLowerCase()
        .equals(PAIS_VALIDO.toLowerCase())
        .withMessage(personasValidationMsgs.PAIS_NOT_VALID),
    expressValidator
        .body("direccion.ciudad")
        .isString()
        .withMessage(personasValidationMsgs.CIUDAD_NOT_PROVIDED)
        .isLength({
            min: validationValues.CIUDAD_MIN_LENGTH,
            max: validationValues.CIUDAD_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.CIUDAD_NOT_VALID),
    expressValidator
        .body("direccion.calle")
        .isString()
        .withMessage(personasValidationMsgs.CALLE_NOT_PROVIDED)
        .isLength({
            min: validationValues.CALLE_MIN_LENGTH,
            max: validationValues.CALLE_MAX_LENGTH,
        })
        .withMessage(personasValidationMsgs.CALLE_NOT_VALID),
    expressValidator
        .body("direccion.numero")
        .isNumeric({
            min: validationValues.NUMERO_MIN_VALUE,
            max: validationValues.NUMERO_MAX_VALUE,
        })
        .withMessage(personasValidationMsgs.NUMERO_NOT_PROVIDED),
    expressValidator
        .body("fechaNacimiento")
        .isISO8601({ strict: true })
        .withMessage(personasValidationMsgs.FECHA_NACIMIENTO_NOT_PROVIDED)
        .custom((date) => {
            const validDate = new Date();
            validDate.setFullYear(
                validDate.getFullYear() -
                    validationValues.MIN_VALUE_YEARS_BIRTHDATE
            );
            return new Date(date).getTime() <= validDate.getTime();
        })
        .withMessage(personasValidationMsgs.FECHA_NACIMIENTO_NOT_VALID),
    checkValidator,
];

/**
 * Validador de una fecha para buscar la productividad de empleados
 */
const empleadosProductividadValidator = [
    expressValidator
        .query("yearMonth")
        .isISO8601({strict: true})
        .withMessage(prodValidationMsgs.FECHA_NOT_PROVIDED)
        .custom((date) => {
            const userDate = new Date(date);
            const now = new Date();
            const limitDate = resetDaysAndHours(now);

            return userDate.getTime() < limitDate.getTime();
        })
        .withMessage(prodValidationMsgs.FECHA_INVALID),
    checkValidator,
];

module.exports = {
    newEmpleadoBodyValidator,
    updateEmpleadoBodyValidator,
    empleadosProductividadValidator,
};
