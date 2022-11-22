import "./SingleEmpleado.css";

import { messages } from "../../assets/messages";
import { CapitalizeEveryFirstLetter } from "../../utils/Strings";

/**
 * Componente de un item de empleado de la lista de empleados
 */
const SingleEmpleado = ({ empleado }) => {
    const renderedNames = (
        <h2 className="container__single-empleado_header-nombre">
            {`${CapitalizeEveryFirstLetter(empleado.nombres)} 
        ${CapitalizeEveryFirstLetter(empleado.apellidos)}`}
        </h2>
    );

    const renderedCargos = (
        <p className="container__single-empleado_header-cargo">
            {empleado.cargo.toUpperCase()}
        </p>
    );

    const renderedRegistrationDate = (
        <p>{`${messages.MENU_EMPLEADOS_FECHA_CREACION} ${new Date(
            empleado.createdAt
        ).toLocaleDateString("es-AR")}`}</p>
    );

    const renderedContratadoState = (
        <p
            className={`container__single-empleado_info-contratado_${empleado.contratado}`}
        >
            {empleado.contratado
                ? messages.MENU_EMPLEADOS_CONTRATADO
                : messages.MENU_EMPLEADOS_NO_CONTRATADO}
        </p>
    );

    const renderedBirthDate = (
        <div className="container__single-empleado_info-row">
            <aside>{messages.MENU_EMPLEADOS_FECHA_NACIMIENTO}</aside>
            <p className="container__single-empleado_info-row_data">
                {new Date(empleado.fechaNacimiento).toLocaleDateString("es-AR")}
            </p>
        </div>
    );

    const renderedAddress = (
        <div className="container__single-empleado_info-row">
            <aside>{messages.MENU_EMPLEADOS_DIRECCION}</aside>
            <p className="container__single-empleado_info-row_data">
                {`${CapitalizeEveryFirstLetter(empleado.direccion.pais)}, 
        ${CapitalizeEveryFirstLetter(empleado.direccion.ciudad)}, 
        ${CapitalizeEveryFirstLetter(empleado.direccion.calle)} 
        ${empleado.direccion.numero}`}
            </p>
        </div>
    );

    const renderedTelephone = (
        <div className="container__single-empleado_info-row">
            <aside>{messages.MENU_EMPLEADOS_TELEFONO}</aside>
            <p className="container__single-empleado_info-row_data">
                {empleado.telefono}
            </p>
        </div>
    );

    const renderedEmail = (
        <div className="container__single-empleado_info-row">
            <aside>{messages.MENU_EMPLEADOS_EMAIL}</aside>
            <a
                href={`mailto:${empleado.email}`}
                className="container__single-empleado_info-row_data"
            >
                {empleado.email}
            </a>
        </div>
    );

    return (
        <article className="container__single-empleado">
            <hr />
            {/* Header */}
            <div className="container__single-empleado_header">
                <div>
                    {renderedNames} <span> - </span> {renderedCargos}
                </div>
                {renderedRegistrationDate}
            </div>
            {/* Informacion */}
            <div className="container__single-empleado_info">
                <div className="container__single-empleado_info-left">
                    {/* Fecha de nacimiento */}
                    {renderedBirthDate}
                    {/* Direccion */}
                    {renderedAddress}
                    {/* Telefono */}
                    {renderedTelephone}
                    {/* Email */}
                    {renderedEmail}
                </div>
                <div className="container__single-empleado_info-right">
                    {renderedContratadoState}
                </div>
            </div>
        </article>
    );
};

export default SingleEmpleado;
