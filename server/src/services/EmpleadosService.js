// Importaciones
const bcrypt = require("bcryptjs");

const cargosRepositorio = require("../repositories/CargosRepository");
const empleadosRepositorio = require("../repositories/EmpleadosRepository");
const ciudadRepository = require("../repositories/CiudadRepository");
const reporteMecanicosRepository = require("../repositories/ReporteMecanicosRepository");

const validatorMsgs = require("../utils/constants/messages/ServiceErrors");

const { NotFoundError, BadRequestError } = require("../utils/errors");

// Definicion de constantes
const COUNTRY_CODE = process.env.CODIGO_PAIS_VALIDO;
const PASSWORD_SALT = Number(process.env.PASSWORD_SALT) || 12;

/**
 * Registra un nuevo empleado en el sistema
 * @param {*} empleado Empleado a ser guardado
 * @throws {NotFoundError} Si el cargo o la ciudad referenciada no existe
 * @throws {BadRequestError} Si ya existe un usuario con el mismo email registrado
 * @returns El nuevo empleado guardado
 */
const save = async (empleado) => {
    // Asegurate que el cargo exista, que no exista un usuario con el mismo email
    // y que la ciudad sea valida
    const foundCargo = await cargosRepositorio.getByNombre(empleado.cargo);
    if (!foundCargo) {
        throw new NotFoundError(
            `${validatorMsgs.CARGO_NOT_VALID}${empleado.cargo}`
        );
    }

    const foundEmpleado = await empleadosRepositorio.getByEmail(empleado.email);
    if (foundEmpleado) {
        throw new BadRequestError(
            `${validatorMsgs.EMPLEADOS_EMAIL_IN_USE}${empleado.email}`
        );
    }

    const foundCity = await ciudadRepository.getByName(
        COUNTRY_CODE,
        empleado.direccion.ciudad
    );
    if (!foundCity) {
        throw new NotFoundError(
            `${validatorMsgs.CIUDAD_NOT_FOUND}${empleado.direccion.ciudad}`
        );
    }

    // Asigna el id del cargo al usuario y encripta la clave
    empleado.cargo = foundCargo._id;
    empleado.password = await bcrypt.hash(empleado.password, PASSWORD_SALT);

    const savedEmpleado = await empleadosRepositorio.save(empleado);
    savedEmpleado.cargo = foundCargo;

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
        throw new NotFoundError(`${validatorMsgs.CARGO_NOT_VALID}${cargo}`);
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
            `${validatorMsgs.EMPLEADOS_NOT_FOUND}${idEmpleado}`
        );
    }

    return undefined;
};

/**
 * Extrae la informacion publica del empleado que sera expuesta a la web
 * @param {*} empleadoModel empleado tal y como se persiste en la base de datos
 * @returns empleado tal y como deberia ser expuesto a los usuarios de la API
 */
const toEmpleadoBody = (empleadoModel) => {
    // Remove la clave y saca la informacion importante del cargo
    const { password, __v, ...empleadoBody } = empleadoModel;
    empleadoBody.cargo = empleadoModel.cargo.nombre;

    return empleadoBody;
};

module.exports = { save, getAll, getByCargo, deleteById };
