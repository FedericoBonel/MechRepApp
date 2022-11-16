/**
 * Contiene todos los mensajes a ser enviados que se corresponden con la validacion de empleados
 */
const MESSAGES = {
    ID_PROVIDED: "Por favor no provea un ID para el nuevo empleado",
    NOMBRES_NOT_PROVIDED: "Por favor provea nombres para el empleado",
    NOMBRES_INVALID_LENGTH:
        "Por favor provea nombres que tengan de 4 a 50 caracteres",
    APELLIDOS_NOT_PROVIDED: "Por favor provea apellidos para el empleado",
    APELLIDOS_INVALID_LENGTH:
        "Por favor provea apellidos que tengan de 4 a 50 caracteres",
    EMAIL_NOT_VALID: "Por favor provea email valido para el empleado",
    EMAIL_INVALID_LENGTH:
        "Por favor provea un email que tenga una longitud de 5 a 80 caracteres",
    TELEFONO_NOT_PROVIDED: "Por favor provea un numero de telefono",
    TELEFONO_INVALID:
        "Por favor provea un numero de telefono valido que tenga 13 caracteres",
    CLAVE_NOT_PROVIDED: "Por favor provea una contraseña para el empleado",
    CLAVE_INVALID:
        "Por favor provea una contraseña que tenga una longitud de 4 a 20 caracteres",
    CARGO_NOT_PROVIDED: "Por favor provea un cargo para el empleado",
    DIRECCION_NOT_PROVIDED: "Por favor provea una direccion para el empleado",
    PAIS_NOT_PROVIDED: "Por favor provea un pais",
    PAIS_NOT_VALID: "Por favor provea el pais: argentina",
    CIUDAD_NOT_PROVIDED: "Por favor provea la ciudad del empleado",
    CIUDAD_NOT_VALID:
        "Por favor provea una ciudad que tenga una longitud de 3 caracteres a 255 caracteres",
    CALLE_NOT_PROVIDED: "Por favor provea la calle del empleado",
    CALLE_NOT_VALID:
        "Por favor provea una calle que tenga una longitud de 4 caracteres a 255 caracteres",
    NUMERO_NOT_PROVIDED:
        "Por favor provea la altura/numero del empleado como un numero entre 0 y 59.999",
    FECHA_NACIMIENTO_NOT_PROVIDED: "Por favor provea una fecha de nacimiento",
    FECHA_NACIMIENTO_NOT_VALID:
        "Por favor provea una fecha de nacimiento valida, por lo menos 15 años en el pasado",
};

module.exports = MESSAGES;
