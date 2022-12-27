/**
 * Fichero que contiene funciones de utilidad de fechas
 */

/**
 * Obtiene la cantidad de horas entre dos fechas
 * @param {Date} startDate Fecha inicial
 * @param {Date} endDate Fecha final
 * @returns Numero de horas entre ambas fechas
 */
const getHoursBetween = (startDate, endDate) => {
    const msBetween = Math.abs(endDate.getTime() - startDate.getTime());

    return Math.round(msBetween / (1000 * 60 * 60));
};

/**
 * Setea la hora a 00:00:00 y el dia a 1 dejando el año y mes intactos en zona horaria internacional
 * @param {Date} date Momento del cual se desea reiniciar el dia y hora
 * @returns Una fecha con el mismo mes y año pero el día y hora seteados en sus valores mínimos en zona horaria internacional
 */
const resetDaysAndHours = (date) => {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
};

module.exports = { getHoursBetween, resetDaysAndHours };
