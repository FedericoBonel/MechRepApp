/**
 * Contiene todos los valores para realizar las validaciones de los campos recibidos correspondientes a personas
 * (empleados y clientes)
 */
const VALORES = {
    // Personas
    NOMBRES_MIN_LENGTH: 3,
    NOMBRES_MAX_LENGTH: 50,
    APELLIDOS_MIN_LENGTH: 3,
    APELLIDOS_MAX_LENGTH: 50,
    EMAIL_MIN_LENGTH: 5,
    EMAIL_MAX_LENGTH: 80,
    TELEFONO_LENGTH: 13,

    // Direccion
    CIUDAD_MIN_LENGTH: 3,
    CIUDAD_MAX_LENGTH: 255,
    CALLE_MIN_LENGTH: 4,
    CALLE_MAX_LENGTH: 255,
    NUMERO_MIN_VALUE: 0,
    NUMERO_MAX_VALUE: 59999,

    // Empleados
    MIN_VALUE_YEARS_BIRTHDATE: 15,
    CARGOS_MIN_LENGTH: 4,
    CARGOS_MAX_LENGTH: 50,
    ACCION_MIN_LENGTH: 3,
    ACCION_MAX_LENGTH: 255,
    PASSWORD_MIN_LENGTH: 4,
    PASSWORD_MAX_LENGTH: 20,
    PASSWORD_MAX_LENGTH_ENCRYPTED: 255,
};

module.exports = VALORES;
