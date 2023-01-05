/**
 * Fichero que contiene todas las constantes utilizadas en las api
 */

// API host URL
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/v1";
// Recursos
const CIUDADES_URL = `${API_BASE_URL}/ciudades`;
const EMPLEADOS_URL = `${API_BASE_URL}/empleados`;
const CARGOS_URL = `${API_BASE_URL}/cargos`;
// Nombres de caches creadas por React Query
const CIUDADES_CACHE = "ciudades";
const CARGOS_CACHE = "cargos";
const EMPLEADOS_CACHE = "empleados";
const PRODUCTIVIDAD = "productividad";

const VALORES = {
    CIUDADES_URL,
    EMPLEADOS_URL,
    CARGOS_URL,
    CIUDADES_CACHE,
    CARGOS_CACHE,
    EMPLEADOS_CACHE,
    PRODUCTIVIDAD
};

export default VALORES;
