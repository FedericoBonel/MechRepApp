/**
 * Este fichero contiene todas las rutas del cliente
 */

// Elementos del dominio
export const EMPLEADOS = "empleados";
export const CARGOS = "cargos";

// Verbos para el dominio
export const CREATE = "crear";

// Rutas
export const PATH_HOME = "/";
// Cargos
export const PATH_CARGOS = `/${CARGOS}`;
// Empleados
export const PATH_EMPLEADOS = `/${EMPLEADOS}`;
export const PATH_CREATE_EMPLEADO = `${PATH_EMPLEADOS}/${CREATE}`;
// Error
export const PATH_ERROR = `/error`;
export const PATH_ERROR_CODE_PARAM = `${PATH_ERROR}/:code`;
