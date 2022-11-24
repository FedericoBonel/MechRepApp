/**
 * Contiene todos los mensajes a ser enviados que se corresponden con la validacion de reportes mecanicos
 */
 const MESSAGES = {
    // Reparaciones Completadas
    REPARACION_COMPLETADA_DESCRIPCION_NOT_PROVIDED: "Por favor provea una descripcion para la reparacion completada",
    REPARACION_COMPLETADA_DESCRIPCION_INVALID_LENGTH:
        "Por favor provea una descripcion para la reparacion completada que tenga de 4 a 512 caracteres",
    REPARACION_COMPLETADA_FECHA_INICIO_NOT_PROVIDED: "Por favor provea una fecha de inicio de la reparacion completada",
    REPARACION_COMPLETADA_FECHA_INICIO_INVALID:
        "Por favor provea una fecha de inicio de la reparacion completada que sea antes de la fecha en la cual se registra",
    REPARACION_COMPLETADA_FECHA_FIN_NOT_PROVIDED: "Por favor provea una fecha de finalizacion de la reparacion completada",
    REPARACION_COMPLETADA_FECHA_FIN_INVALID:
        "Por favor provea una fecha de finalizacion de la reparacion completada que sea antes o igual de la fecha en la cual se registra",
    REPARACION_COMPLETADA_MECANICO_NOT_PROVIDED:
        "Por favor provea el mecanico que ha completado la reparacion",

    // Danos a reparar
    DANOS_REPARAR_NOT_PROVIDED: "Por favor provea los daños a reparar en el vehiculo",
    DANO_REPARAR_DESCRIPCION_NOT_PROVIDED: "Por favor provea una descripcion para el daño a reparar",
    DANO_REPARAR_DESCRIPCION_INVALID_LENGTH:
        "Por favor provea una descripcion para el daño a reparar que tenga de 4 a 512 caracteres",
    
    // Cliente
    CLIENTE_NOT_PROVIDED: "Por favor provea el cliente para el que se crea el reporte mecanico",

    // Vehiculo
    VEHICULO_NOT_PROVIDED: "Por favor provea el vehiculo a reparar para el que se crea el reporte mecanico",

    // Receptor
    RECEPTOR_NOT_PROVIDED: "Por favor provea el empleado que ha recibido el vehiculo y que crea el reporte mecanico",

    // Danos a no reparar previos
    DANO_PREVIOS_NOT_PROVIDED: "Por favor provea una descripcion para los daños previos a no ser reparados",
    DANO_PREVIOS_INVALID_LENGTH:
        "Por favor provea una descripcion para los daños previos a no ser reparados que tenga de 4 a 512 caracteres",
};

module.exports = MESSAGES;