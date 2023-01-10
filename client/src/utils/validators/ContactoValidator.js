/**
 * Libreria de validacion de datos de contact
 */
import * as constants from "./Constants";

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
