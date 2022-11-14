/**
 * Abstraccion de un error de la API, 
 * agrega un atributo de status con el codigo HTTP que genero el error
 */
class ApiError extends Error {

    /**
     * Construye un nuevo error de la API
     * @param {String} message Mensaje que explica el error
     * @param {Number} status Codigo HTTP que se corresponde con el error
     */
    constructor(message, status){
        super(message);
        this.status = status;
    }
}

module.exports = ApiError;