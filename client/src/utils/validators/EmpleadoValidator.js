/**
 * Libreria de validacion de empleados
 */

import * as constants from "./Constants";

/**
 * Valida un objeto o string de fecha
 * como fecha de nacimiento valida para el empleado
 * @param {*} date Cualquier fecha acepatada por el constructor del objeto Date
 * @returns Verdadero si es valida, falso en caso contrario
 */
export const isFechaNacimiento = (date) => {
    const validDateMax = new Date();
    validDateMax.setFullYear(
        validDateMax.getFullYear() - constants.VALORES.EMPL_MIN_VALUE_YEARS_BIRTHDATE
    );

    let validatedDate;
    try {
        validatedDate = new Date(date);
    } catch (error) {
        return false;
    }
    return validatedDate.getTime() < validDateMax.getTime();
};

/**
 * Verifica si los nombres de una persona son validos
 * @param {String} nombres Nombres a ser validados
 * @returns Verdadero si son validos o falso en caso contrario
 */
export const isNombres = (nombres) => {
    return (
        constants.VALORES.EMPL_MIN_LENGTH_NOMBRES <= nombres.length &&
        nombres.length <= constants.VALORES.EMPL_MAX_LENGTH_NOMBRES
    );
};

/**
 * Verifica si los apellidos de una persona son validos
 * @param {String} apellidos Apellidos a ser validados
 * @returns Verdadero si son validos o falso en caso contrario
 */
export const isApellidos = (apellidos) => {
    return (
        constants.VALORES.EMPL_MIN_LENGTH_APELLIDOS <= apellidos.length &&
        apellidos.length <= constants.VALORES.EMPL_MAX_LENGTH_APELLIDOS
    );
};

/**
 * Verifica si un email es valido
 * @param {String} email Email a ser validado
 * @returns Verdadero si es valido o falso en caso contrario
 */
export const isEmail = (email) => {
    return (
        constants.VALORES.EMPL_MIN_LENGTH_EMAIL <= email.length &&
        email.length <= constants.VALORES.EMPL_MAX_LENGTH_EMAIL &&
        email.match(constants.EMAIL_REGEX)
    );
};

/**
 * Verifica si un telefono es valido
 * @param {String} telefono Telefono a ser validado
 * @returns Verdadero si es valido o falso en caso contrario
 */
export const isTelefono = (telefono) => {
    return (
        telefono.length === constants.VALORES.EMPL_LENGTH_TELEFONO &&
        telefono.match(constants.TELEFONO_REGEX)
    );
};

/**
 * Verifica si una clave es valida
 * @param {String} password Clave a ser validada
 * @returns Verdadero si es valida o falso en caso contrario
 */
export const isPassword = (password) => {
    return (
        constants.VALORES.EMPL_MIN_LENGTH_PASSWORD <= password.length &&
        password.length <= constants.VALORES.EMPL_MAX_LENGTH_PASSWORD
    );
};

/**
 * Verifica si una calle es valida
 * @param {String} calle Calle a ser validada
 * @returns Verdadero si es valida o falso en caso contrario
 */
export const isCalle = (calle) => {
    return (
        constants.VALORES.EMPL_MIN_LENGTH_CALLE <= calle.length &&
        calle.length <= constants.VALORES.EMPL_MAX_LENGTH_CALLE
    );
};

/**
 * Verifica si un numero/altura de una calle es valida
 * @param {String} numero Numero a ser validado
 * @returns Verdadero si es valido o falso en caso contrario
 */
export const isNumero = (numero) => {
    return (
        constants.VALORES.EMPL_MIN_VALUE_NUMERO <= numero &&
        numero <= constants.VALORES.EMPL_MAX_VALUE_NUMERO
    );
};
