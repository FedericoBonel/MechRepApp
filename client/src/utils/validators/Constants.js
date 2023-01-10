/**
 * En este fichero se encuentran todas las constantes de validacion
 */

// HTML patterns
export const TELEFONO_PATTERN = "549(11|[2368]\\d)\\d{8}";

// Regexes
export const TELEFONO_REGEX = /549(11|[2368]\d)\d{8}/;
export const EMAIL_REGEX =
    // eslint-disable-next-line
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

// Maximos y minimos de valores
export const VALORES = {
    // Empleados
    EMPL_MAX_LENGTH_NOMBRES: 50,
    EMPL_MIN_LENGTH_NOMBRES: 3,
    EMPL_MAX_LENGTH_APELLIDOS: 50,
    EMPL_MIN_LENGTH_APELLIDOS: 3,
    EMPL_MAX_LENGTH_EMAIL: 80,
    EMPL_MIN_LENGTH_EMAIL: 5,
    EMPL_LENGTH_TELEFONO: 13,
    EMPL_MAX_LENGTH_PASSWORD: 20,
    EMPL_MIN_LENGTH_PASSWORD: 4,
    EMPL_MAX_LENGTH_CALLE: 255,
    EMPL_MIN_LENGTH_CALLE: 4,
    EMPL_MAX_VALUE_NUMERO: 59999,
    EMPL_MIN_VALUE_NUMERO: 0,
    EMPL_MIN_VALUE_YEARS_BIRTHDATE: 15,
    // Taller
    TALLER_MAX_LENGTH_NOMBRE: 50,
    TALLER_MIN_LENGTH_NOMBRE: 4,
    TALLER_MAX_LENGTH_EMAIL: 80,
    TALLER_MIN_LENGTH_EMAIL: 5,
    TALLER_LENGTH_TELEFONO: 13,
    TALLER_MAX_LENGTH_CALLE: 255,
    TALLER_MIN_LENGTH_CALLE: 4,
    TALLER_MAX_VALUE_NUMERO: 59999,
    TALLER_MIN_VALUE_NUMERO: 0,
};
