/**
 * Libreria de validacion de direcciones
 */
import * as constants from "./Constants";

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
        numero <= constants.VALORES.EMPL_MAX_VALUE_NUMERO &&
        numero
    );
};
