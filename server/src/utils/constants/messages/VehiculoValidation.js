/**
 * Contiene todos los mensajes a ser enviados que se corresponden con la validacion de vehiculos
 */
const MESSAGES = {
    MARCA_NOT_PROVIDED: "Por favor provea una marca para el vehiculo",
    MARCA_INVALID_LENGTH:
        "Por favor provea una marca de vehiculo que tenga de 2 a 50 caracteres",
    MODELO_NOT_PROVIDED: "Por favor provea un modelo de vehiculo",
    MODELO_INVALID_LENGTH:
        "Por favor provea un modelo de vehiculo que tenga de 1 a 50 caracteres",
    PATENTE_NOT_VALID: "Por favor provea una patente valida",
    PATENTE_INVALID_LENGTH:
        "Por favor provea una patente que tenga una longitud de 3 a 25 caracteres",
    NUMERO_SERIE_NOT_PROVIDED: "Por favor provea un numero de serie",
    NUMERO_SERIE_INVALID:
        "Por favor provea un numero de serie valido que tenga 17 caracteres",
    FECHA_FABRICACION_INVALID:
        "Por favor provea un fecha de fabricacion del vehiculo valida (Como maximo el dia de hoy)",
    NUMERO_ASIENTOS_INVALID:
        "Por favor provea un numero de asientos como un valor entre 1 y 30 inclusive",
};

module.exports = MESSAGES;
