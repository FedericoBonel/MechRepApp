/**
 * Fichero que contiene todas las interacciones con la api
 * para gestionar cargos
 */
import axios from "axios";

import apiConstantes from "./Constants";

const cargosInstanceAPI = axios.create({ baseURL: apiConstantes.CARGOS_URL });

/**
 * Busca todos los cargos desde el back end
 * @returns La respuesta del servidor con todos los cargos
 */
const getCargos = async () => {
    const response = await cargosInstanceAPI.get("/");
    return response.data;
};

const cargosAPI = {
    getCargos,
};

export default cargosAPI;
