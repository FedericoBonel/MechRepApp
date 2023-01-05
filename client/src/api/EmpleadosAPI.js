/**
 * Fichero que contiene todas las interacciones con la api
 * para gestionar ciudades
 */
import axios from "axios";

import apiConstantes from "./Constants";

const empleadosInstanceAPI = axios.create({
    baseURL: apiConstantes.EMPLEADOS_URL,
});

/**
 * Busca todos los empleados desde el back end
 * @param cargo Parametro opcional, de ser proporcionado filtra la lista por el cargo
 * @param page Parametro opcional, de ser proporcionado se traera solo una pagina especifica de todos los empleados
 * @param limit Parametro opcional, de ser proporcionado se traera solo esta cantidad especfica de empleados desde la base de datos
 * @returns La respuesta del servidor con todos los empleados
 */
const getEmpleados = async (cargo = "", page = 1, limit = 10) => {
    const config = { params: { cargo, page, limit } };

    const response = await empleadosInstanceAPI.get("/", config);
    return response.data;
};

/**
 * Busca un empleado por id
 * @param {*} idEmpleado Id del empleado a buscar
 * @returns El empleado encontrado
 */
const getEmpleadoById = async (idEmpleado) => {
    const response = await empleadosInstanceAPI.get(`/${idEmpleado}`);
    return response.data;
}

/**
 * Crea un empleado en el back end
 * @param {*} newEmpleado Nuevo empleado con todos sus campos
 * @returns La respuesta del servidor con el nuevo empleado
 */
const postEmpleado = async (newEmpleado) => {
    return empleadosInstanceAPI.post("/", newEmpleado);
};

/**
 * Actualiza un empleado en el back end
 * @param {String} idEmpleado Id del empleado a actualizar
 * @param {*} updatedEmpleado Empleado y todos sus campos actualizados
 * @returns La respuesta del servidor con el empleado editado
 */
const patchEmpleado = async (idEmpleado, updatedEmpleado) => {
    const response = await empleadosInstanceAPI.patch(`/${idEmpleado}`, updatedEmpleado);
    return response.data;
};

/**
 * Elimina un empleado desde el back end
 * @param {String} idEmpleado Identificador del empleado a eliminar
 * @returns Undefined si el empleado fue eliminado correctamente o
 *          el empleado actualizado como no contratado en caso de que haya participado en reportes mecanicos
 */
const deleteEmpleado = async (idEmpleado) => {
    const deletedRes = await empleadosInstanceAPI.delete(`/${idEmpleado}`);
    return deletedRes.data;
};

/**
 * Busca todos los puntajes de productividad desde el back end
 * @param yearMonth Año y mes de los puntajes a ser buscados, debe estar en formato ISO 8601
 * @param page Parametro opcional, de ser proporcionado se traera solo una pagina especifica de todos los puntajes
 * @param limit Parametro opcional, de ser proporcionado se traera solo esta cantidad especfica de puntajes desde la base de datos
 * @returns La respuesta del servidor con todos los puntajes
 */
const getProductividad = async (yearMonth, page = 1, limit = 5) => {
    const config = { params: { yearMonth, page, limit } };

    const response = await empleadosInstanceAPI.get("/productividad", config);
    return response.data;
};

const empleadosAPI = {
    getEmpleados,
    getEmpleadoById,
    postEmpleado,
    deleteEmpleado,
    patchEmpleado,
    getProductividad
};

export default empleadosAPI;
