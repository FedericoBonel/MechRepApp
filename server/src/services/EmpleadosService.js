// Importaciones
const bcrypt = require("bcryptjs");

const cargosRepositorio = require("../repositories/CargosRepository");
const empleadosRepositorio = require("../repositories/EmpleadosRepository");
const ciudadRepository = require("../repositories/CiudadRepository");

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

module.exports = { save };
