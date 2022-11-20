/**
 * Contiene todos los mensajes a ser enviados en los errores de repositorios
 */
const MESSAGES = {
    // Ciudades
    CIUDAD_API_EXPIRED_KEY:
        "La llave de acceso al API de ciudades fue revocada, por favor informe al administrador para su renovacion",
    PAIS_NOT_FOUND: "El pais no fue encontrado en la base de datos: ",
    UNKNOWN_API_ERROR:
        "Un error ha sucedido en la conexion con la api, intente nuevamente y si el problema continua por favor contacte con el administrador del sistema",
};

module.exports = MESSAGES;
