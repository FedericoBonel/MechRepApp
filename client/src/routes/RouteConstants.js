/**
 * Este fichero contiene todas las rutas del cliente
 */

// Elementos del dominio
export const EMPLEADOS = "empleados";
export const CARGOS = "cargos";

// Verbos para el dominio
export const CREATE = "crear";
export const UPDATE = "editar";
export const PROD = "productividad";
export const TALLER = "taller";

// Rutas
export const PATH_HOME = "/";
// Cargos
export const PATH_CARGOS = `/${CARGOS}`;
// Empleados
export const PATH_EMPLEADOS = `/${EMPLEADOS}`;
export const PATH_CREATE_EMPLEADO = `${PATH_EMPLEADOS}/${CREATE}`;
export const PATH_UPDATE_EMPLEADO = `${PATH_EMPLEADOS}/${UPDATE}`;
export const PATH_PROD_EMPLEADOS = `${PATH_EMPLEADOS}/${PROD}`;
// Taller
export const PATH_TALLER = `/${TALLER}`;
export const PATH_CREATE_TALLER = `/${TALLER}/${CREATE}`;
// Error
export const PATH_ERROR = `/error`;
export const PATH_ERROR_CODE_PARAM = `${PATH_ERROR}/:code`;
