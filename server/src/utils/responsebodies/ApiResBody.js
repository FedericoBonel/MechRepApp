/**
 * Abstrae al cuerpo de una respuesta basica de la API
 */
class ApiResponse {
    /**
     * Construye un cuerpo de respuesta basica para la api
     * @param {Boolean} success Valor de exito, verdadero si la respuesta es exitosa, falso de lo contrario
     */
    constructor(success) {
        this.success = success;
    }
}

module.exports = ApiResponse;
