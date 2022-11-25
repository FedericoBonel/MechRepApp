import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./SingleEmpleado.css";

import { ModalConfirm } from "../";
import { messages } from "../../assets/messages";
import { CapitalizeEveryFirstLetter } from "../../utils/Strings";

/**
 * Componente de un item de empleado de la lista de empleados
 */
const SingleEmpleado = ({ empleado, onDelete }) => {
    // Estados ---------------------------------------------------------------------------------------------
    const [showInfo, setShowInfo] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Handlers de interacciones ------------------------------------------------------------------------
    const onConfirmDelete = () => {
        onDelete();
        setShowConfirmModal(false);
    }

    // Renderizaciones -------------------------------------------------------------------------------------
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

    const renderedContratadoState = (
        <p
            className={`container__single-empleado_header-contratado 
            container__single-empleado_header-contratado_${empleado.contratado}`}
        >
            {empleado.contratado
                ? messages.MENU_EMPLEADOS_CONTRATADO
                : messages.MENU_EMPLEADOS_NO_CONTRATADO}
        </p>
    );

    const renderedDeleteButton = (
        <button
            className="container__single-empleado_info-deletebtn"
            aria-label={messages.MENU_EMPLEADOS_BORRAR_EMPLEADO}
            onClick={() => setShowConfirmModal(true)}
        >
            {<FontAwesomeIcon icon={faTrash} />}
        </button>
    );

    const renderedToggleInfoState = (
        <FontAwesomeIcon
            icon={faSquareCaretDown}
            flip={showInfo ? "vertical" : false}
        />
    );

    const renderedRegistrationDate = (
        <p>{`${messages.MENU_EMPLEADOS_FECHA_CREACION} ${new Date(
            empleado.createdAt
        ).toLocaleDateString("es-AR")}`}</p>
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

    const renderedInfo = showInfo && (
        <div className="container__single-empleado_info swing-in">
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
                {renderedRegistrationDate}
            </div>
        </div>
    );

    return (
        <article className="container__single-empleado">
            <hr />
            {/* Header */}
            <div className="container__single-empleado_header">
                <button
                    className="container__single-empleado_header-toggleinfo"
                    onClick={() => setShowInfo((prevInfo) => !prevInfo)}
                >
                    <div>
                        {renderedNames} <span> - </span> {renderedCargos}
                    </div>
                    <div>
                        {renderedContratadoState}
                        {renderedToggleInfoState}
                    </div>
                </button>
                <div className="container__single-empleado_header-actionbtns">
                    {renderedDeleteButton}
                </div>
            </div>
            {/* Informacion */}
            {renderedInfo}
            {/* Modal de confirmacion de eliminacion */}
            <ModalConfirm
                onAccept={onConfirmDelete}
                onCancel={() => setShowConfirmModal(false)}
                show={showConfirmModal}
                heading={messages.MODAL_DEL_EMPLEADO_TITLE}
                question={messages.MODAL_DEL_EMPLEADO_QUESTION}
            />
        </article>
    );
};

export default SingleEmpleado;
