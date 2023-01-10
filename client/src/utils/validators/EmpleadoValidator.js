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
        validDateMax.getFullYear() -
            constants.VALORES.EMPL_MIN_VALUE_YEARS_BIRTHDATE
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
