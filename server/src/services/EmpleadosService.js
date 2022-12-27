// Importaciones
const bcrypt = require("bcryptjs");

const cargosRepositorio = require("../repositories/CargosRepository");
const empleadosRepositorio = require("../repositories/EmpleadosRepository");
const ciudadRepository = require("../repositories/CiudadRepository");
const reporteMecanicosRepository = require("../repositories/ReporteMecanicosRepository");
const productividadRepository = require("../repositories/ProductividadRepository");

const errorMsgs = require("../utils/constants/messages/ServiceErrors");

const {
    NotFoundError,
    BadRequestError,
    InternalServerError,
} = require("../utils/errors");
const {
    getHoursBetween,
    resetDaysAndHours,
} = require("../utils/dates/DateFunctions");

// Definicion de constantes
const COUNTRY_CODE = process.env.CODIGO_PAIS_VALIDO;
const PASSWORD_SALT = Number(process.env.PASSWORD_SALT) || 12;

/**
 * Registra un nuevo empleado en el sistema
 * @param {*} empleado Empleado a ser guardado
 * @returns El nuevo empleado guardado
 */
const save = async (empleado) => {
    const empleadoToSave = await toEmpleadoSchema(empleado);

    const savedEmpleado = await empleadosRepositorio.save(empleadoToSave);

    return toEmpleadoBody(savedEmpleado);
};

/**
 * Consigue una lista de todos los empleados del sistema
 * @param {Number} page Numero de la pagina de documentos que desean conseguirse, de ser 0 retorna todos los empleados
 * @param {Number} limit Cantidad de documentos a mostrar por pagina, de ser 0 retorna todos los empleados
 * @returns Lista de todos los empleados registrados para la pagina y limites establecidos
 */
const getAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const empleados = await empleadosRepositorio.getAll(skip, limit);

    // Extrae la informacion publica de cada empleado
    return empleados.map((empleado) => toEmpleadoBody(empleado));
};

/**
 * Consigue un empleado por id
 * @param {String} idEmpleado Id del empleado a buscar
 * @throws {NotFoundError} Si no existe un empleado con ese id
 * @returns Empleado con el id pedido
 */
const getById = async (idEmpleado) => {
    const savedEmpleado = await empleadosRepositorio.getById(idEmpleado);

    if (!savedEmpleado) {
        throw new NotFoundError(
            `${errorMsgs.EMPLEADOS_NOT_FOUND}${idEmpleado}`
        );
    }

    // Extrae la informacion publica del empleado
    return toEmpleadoBody(savedEmpleado);
};

/**
 * Consigue una lista de todos los empleados del sistema por cargo
 * @param {String} cargo Nombre del cargo del cual se desea conseguir los empleados
 * @param {Number} page Numero de la pagina de documentos que desean conseguirse, de ser 0 retorna todos los empleados con el cargo proveido
 * @param {Number} limit Cantidad de documentos a mostrar por pagina, de ser 0 retorna todos los empleados con el cargo proveido
 * @throws {NotFoundError} Si el cargo no existe en la base de datos
 * @returns Lista de todos los empleados registrados para la pagina y limites establecidos
 */
const getByCargo = async (cargo, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    // Verifica si existe el cargo proveido y de ser asi obten su id
    const foundCargo = await cargosRepositorio.getByNombre(cargo);
    if (!foundCargo) {
        throw new NotFoundError(`${errorMsgs.CARGO_NOT_VALID}${cargo}`);
    }

    const empleados = await empleadosRepositorio.getByCargo(
        foundCargo._id,
        skip,
        limit
    );

    // Extrae la informacion publica de cada empleado
    return empleados.map((empleado) => toEmpleadoBody(empleado));
};

/**
 * Elimina a un empleado por id o,
 * si el empleado posee reportes mecanicos con referencias a el, lo actualiza como no contratado
 * @param {String} idEmpleado Id del empleado a eliminar
 * @throws {NotFoundError} Si el empleado con ese id no se encuentra en la base de datos
 * @returns Empleado actualizado de haber participado en reportes mecanicos, undefined en caso contrario
 */
const deleteById = async (idEmpleado) => {
    // Busca si el empleado tiene reportes mecanicos, de ser asi actualizalo
    // como no contratado si no eliminalo
    const foundReportes = await reporteMecanicosRepository.getAllByEmpleado(
        idEmpleado
    );

    if (foundReportes.length) {
        const empleado = await empleadosRepositorio.updateById(idEmpleado, {
            contratado: false,
        });

        return toEmpleadoBody(empleado);
    }

    const deletedEmpleado = await empleadosRepositorio.deleteById(idEmpleado);

    if (!deletedEmpleado) {
        throw new NotFoundError(
            `${errorMsgs.EMPLEADOS_NOT_FOUND}${idEmpleado}`
        );
    }

    return undefined;
};

/**
 * Actualiza a un empleado por id
 * @param {String} idEmpleado Id del empleado a actualizar
 * @param {*} updatedEmpleado Actualizaciones a ser aplicadas al empleado
 * @returns Empleado actualizado
 */
const updateById = async (idEmpleado, updatedEmpleado) => {
    updatedEmpleado._id = idEmpleado;
    const empleadoToSave = await toEmpleadoSchema(updatedEmpleado);

    const savedEmpleado = await empleadosRepositorio.updateById(
        idEmpleado,
        empleadoToSave
    );

    if (!savedEmpleado) {
        throw new NotFoundError(
            `${errorMsgs.EMPLEADOS_NOT_FOUND}${idEmpleado}`
        );
    }

    return toEmpleadoBody(savedEmpleado);
};

/**
 * Obtiene la productividad de los empleados en el año y mes de la fecha proveída ordenadas de mayor a menor
 * @param {Date} date fecha que contiene el año y mes por el cual se desea conseguir los puntajes de productividad
 * @returns Un array con todos los puntajes de productividad por empleado ordenados de mayor a menor
 */
const getProductividadByYearAndMonth = async (date, page = 1, limit = 5) => {
    const skip = (page - 1) * limit;
    // Verifica si ya ha sido calculado
    let prod = await productividadRepository.getByYearAndMonth(
        date,
        skip,
        limit
    );
    // Si no calculalo y guardalo
    if (!prod.length && Number(page) === 1) {
        const closedReportes =
            await reporteMecanicosRepository.getAllByClosureYearAndMonth(date);

        const prodByEmpleado = getProdByEmpleadoFrom(closedReportes);
        prod = await productividadRepository.saveAll(prodByEmpleado);
        prod.sort((a, b) => b.puntaje - a.puntaje);
        prod = prod.slice(0, limit ? limit : undefined);
    }

    // Extrae la informacion publica
    prod.forEach((prodEmpleado) => {
        prodEmpleado.empleado = toEmpleadoBody(prodEmpleado.empleado);
    });

    return prod;
};

/**
 * Obtiene y calcula los puntajes de productividad de los empleados de todas
 * las reparaciones completadas de un conjunto de reportes cerrados
 * @param {[*]} closedReportes Reportes cerrados de los cuales se desea obtener el puntaje
 * @returns Un array con todos los puntajes de productividad tal y como deben ser persistidos
 */
const getProdByEmpleadoFrom = (closedReportes) => {
    const prodByEmpleado = {};

    // Obten el total de reparaciones completadas por empleado y horas dedicadas
    for (const reporte of closedReportes) {
        if (reporte.abierto) {
            continue;
        }

        for (const danoReparar of reporte.danosReparar) {
            const reparacion = danoReparar.reparacionCompletada;
            if (!reparacion) {
                throw new InternalServerError(errorMsgs.CORRUPT_DATA);
            }

            const idMecanico = reparacion.mecanico;

            if (prodByEmpleado[idMecanico]) {
                // Si el empleado ya ha sido visitado agrega las horas y reparaciones
                prodByEmpleado[idMecanico].nReparaciones =
                    prodByEmpleado[idMecanico].nReparaciones + 1;
                prodByEmpleado[idMecanico].horasTotalesReparaciones =
                    prodByEmpleado[idMecanico].horasTotalesReparaciones +
                    getHoursBetween(
                        reparacion.horaFechaInicio,
                        reparacion.horaFechaFin
                    );
            } else {
                // Si no agregalo
                const date = resetDaysAndHours(reporte.fechaCierre);

                prodByEmpleado[idMecanico] = {
                    empleado: idMecanico,
                    fecha: date,
                    nReparaciones: 1,
                    horasTotalesReparaciones: getHoursBetween(
                        reparacion.horaFechaInicio,
                        reparacion.horaFechaFin
                    ),
                };
            }
        }
    }

    // Calcula el puntaje final
    let result = [];
    for (const idMecanico of Object.keys(prodByEmpleado)) {
        const calculatedProd = Math.fround(
            Math.pow(prodByEmpleado[idMecanico].nReparaciones, 2) /
                (prodByEmpleado[idMecanico].horasTotalesReparaciones || 1)
        ).toFixed(2);

        prodByEmpleado[idMecanico].puntaje = parseFloat(calculatedProd);
        result.push(prodByEmpleado[idMecanico]);
    }

    return result;
};

/**
 * Extrae la informacion publica del empleado que sera expuesta a la web
 * @param {*} empleadoModel empleado tal y como se persiste en la base de datos
 * @returns empleado tal y como deberia ser expuesto a los usuarios de la API
 */
const toEmpleadoBody = (empleadoModel) => {
    // Remove la clave y saca la informacion importante del cargo
    const { password, __v, ...empleadoBody } = empleadoModel;

    if (empleadoBody.cargo?.nombre) {
        empleadoBody.cargo = empleadoModel.cargo.nombre;
    }

    return empleadoBody;
};

/**
 * Convierte y estructura la informacion privada del empleado que sera persistida
 * @param {*} empleadoInput empleado tal y como se expone en la web
 * @throws {NotFoundError} Si el cargo o la ciudad referenciada no existe
 * @throws {BadRequestError} Si ya existe otro empleado con el mismo email registrado
 * @returns Empleado tal y como debe ser persistido en Base de Datos
 */
const toEmpleadoSchema = async (empleadoInput) => {
    let { ...empleadoSchema } = empleadoInput;
    // Asegurate que el cargo exista, que no exista un usuario con el mismo email
    // y que la ciudad sea valida
    const foundCargo = await cargosRepositorio.getByNombre(
        empleadoSchema.cargo
    );
    if (!foundCargo) {
        throw new NotFoundError(
            `${errorMsgs.CARGO_NOT_VALID}${empleadoSchema.cargo}`
        );
    }

    const foundEmpleado = await empleadosRepositorio.getByEmail(
        empleadoSchema.email
    );
    if (foundEmpleado && foundEmpleado._id.toString() !== empleadoSchema._id) {
        throw new BadRequestError(
            `${errorMsgs.EMPLEADOS_EMAIL_IN_USE}${empleadoSchema.email}`
        );
    }

    const foundCity = await ciudadRepository.getByName(
        COUNTRY_CODE,
        empleadoSchema.direccion.ciudad
    );
    if (!foundCity) {
        throw new NotFoundError(
            `${errorMsgs.CIUDAD_NOT_FOUND}${empleadoSchema.direccion.ciudad}`
        );
    }

    // Asigna el id del cargo al usuario y encripta la clave
    empleadoSchema.cargo = foundCargo._id;

    // Si se desea hay contraseña, encriptala y asignala
    if (empleadoSchema.password) {
        empleadoSchema.password = await bcrypt.hash(
            empleadoSchema.password,
            PASSWORD_SALT
        );
    }

    return empleadoSchema;
};

module.exports = {
    save,
    getAll,
    getByCargo,
    deleteById,
    updateById,
    getById,
    getProductividadByYearAndMonth,
};
