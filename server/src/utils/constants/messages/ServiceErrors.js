/**
 * Contiene todos los mensajes a ser enviados en los errores de servicios
 */
const MESSAGES = {
    // Cargos
    CARGO_NOT_VALID: "El cargo proveido no existe en la base de datos: ",
    // Ciudades
    CIUDAD_NOT_FOUND: "La ciudad proveida no existe en la base de datos: ",
    PAIS_NOT_FOUND: "El pais proveido no existe en la base de datos: ",
    // Empleados
    EMPLEADOS_EMAIL_IN_USE: "Ya existe un empleado registrado con el email: ",
    EMPLEADOS_NOT_FOUND: "El empleado proveido no existe en la base de datos: ",
    CORRUPT_DATA:
        "Existen daños a ser reparados sin reparaciones en reportes cerrados durante este mes, avise al administrador del sistema para corregirlo",
    // Taller
    TALLER_EXISTS: "El taller ya esta registrado en el sistema",
    TALLER_NOT_FOUND: "El taller no existe en la base de datos",
};

module.exports = MESSAGES;
