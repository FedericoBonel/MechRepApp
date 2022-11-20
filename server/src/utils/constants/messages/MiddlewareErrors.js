/**
 * Contiene todos los mensajes a ser enviados en los errores de middleware
 */
const MESSAGES = {
    // Path not found
    PATH_NOT_FOUND: "La siguiente ruta no fue encontrada: ",
    // Error handler
    DEFAULT_SERVER_ERROR:
        "Hubo un error interno en el servidor, por favor intente nuevamente",
    // Validation Check
    BODY_VALIDATION_FAILED: "La validacion del cuerpo recibido ha fallado",
};

module.exports = MESSAGES;
