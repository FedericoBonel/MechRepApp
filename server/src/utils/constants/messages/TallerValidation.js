/**
 * Contiene todos los mensajes a ser enviados que se corresponden con la validacion de talleres
 */
const VALORES = {
    NOMBRE_NOT_PROVIDED: "Por favor, provea un nombre para el taller",
    NOMBRE_NOT_VALID:
        "Por favor, provea un nombre valido para el taller (4 caracteres de longitud minima y 50 caracteres de longitud maxima)",
    DIRECCION_NOT_PROVIDED: "Por favor provea una direccion para el taller",
    TELEFONO_NOT_PROVIDED: "Por favor, provea un telefono",
    TELEFONO_INVALID:
        "Por favor, provea un telefono valido (13 caracteres de longitud con el codigo de area y pais de argentina)",
    EMAIL_INVALID_LENGTH:
        "Por favor, provea un email valido (5 caracteres de longitud minima y 80 de maxima)",
    EMAIL_NOT_VALID: "Por favor provea un email valido",
};

module.exports = VALORES;
