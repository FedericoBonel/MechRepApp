/**
 * Libreria de validacion de talleres
 */
import * as constants from "./Constants";

/**
 * Verifica si el nombre de un taller es validos
 * @param {String} nombre Nombre a ser validado
 * @returns Verdadero si es valido o falso en caso contrario
 */
export const isNombre = (nombres) => {
    return (
        constants.VALORES.TALLER_MIN_LENGTH_NOMBRE <= nombres.length &&
        nombres.length <= constants.VALORES.TALLER_MAX_LENGTH_NOMBRE
    );
};
