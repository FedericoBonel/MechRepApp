/**
 * Contiene todos los mensajes a ser enviados que se corresponden con la validacion de productividad
 * (de empleados)
 */
const MESSAGES = {
    FECHA_NOT_PROVIDED:
        "Por favor, provea una fecha valida con el mes y año de la productividad de los empleados",
    FECHA_INVALID:
        "Por favor, provea una fecha de busqueda de productividad que sea en el pasado y como máximo el mes anterior",
    PUNTAJE_NOT_PROVIDED:
        "Por favor, provea el puntaje del empleado en cuestion a ser almacenado para este año y mes",
    HORAS_NOT_PROVIDED:
        "Por favor, provea el numero total de horas dedicadas a reparaciones por el empleado en este año y mes",
    REPARACIONES_NOT_PROVIDED:
        "Por favor, provea el numero total de reparaciones generadas por el empleado en este año y mes",
};

module.exports = MESSAGES;
