/**
 * Fichero que contiene todas las interacciones con la api
 * para gestionar ciudades
 */
import axios from "axios";

import apiConstantes from "./Constants";

const ciudadesInstanceAPI = axios.create({
    baseURL: apiConstantes.CIUDADES_URL,
});

/**
 * Busca todas las ciudades desde el back end
 * @returns La respuesta del servidor con todas las ciudades
 */
const getCiudades = async () => {
    const response = await ciudadesInstanceAPI.get("/");
    return await response.data;
};

const ciudadesAPI = {
    getCiudades,
};

export default ciudadesAPI;
