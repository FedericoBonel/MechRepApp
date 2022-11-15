/**
 * En este fichero se encuentran todas las constantes de validacion
 */

// HTML patterns
export const TELEFONO_PATTERN = "549(11|[2368]\\d)\\d{8}";

// Regexes
export const TELEFONO_REGEX = /549(11|[2368]\d)\d{8}/;
export const EMAIL_REGEX =
    // eslint-disable-next-line
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Maximos y minimos de valores
export const VALORES = {
    MAX_LENGTH_NOMBRES: 50,
    MIN_LENGTH_NOMBRES: 3,
    MAX_LENGTH_APELLIDOS: 50,
    MIN_LENGTH_APELLIDOS: 3,
    MAX_LENGTH_EMAIL: 80,
    MIN_LENGTH_EMAIL: 5,
    LENGTH_TELEFONO: 13,
    MAX_LENGTH_PASSWORD: 20,
    MIN_LENGTH_PASSWORD: 4,
    MAX_LENGTH_CALLE: 255,
    MIN_LENGTH_CALLE: 4,
    MAX_VALUE_NUMERO: 59999,
    MIN_VALUE_NUMERO: 0,
    MIN_VALUE_YEARS_BIRTHDATE: 15
};
