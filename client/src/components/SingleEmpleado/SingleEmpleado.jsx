import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faCaretDown,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";

import "./SingleEmpleado.css";

import { routes } from "../../routes/";
import { ModalConfirm } from "../";
import { messages } from "../../assets/messages";
import { CapitalizeEveryFirstLetter } from "../../utils/Strings";

/**
 * Componente de un item de empleado de la lista de empleados
 */
const SingleEmpleado = ({
    empleado,
    onDelete,
    isProductividad,
    isDeleting,
}) => {
    // Estados ---------------------------------------------------------------------------------------------
    const [showInfo, setShowInfo] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Handlers de interacciones ------------------------------------------------------------------------
    const onConfirmDelete = () => {
        onDelete();
        setShowConfirmModal(false);
    };

    // Renderizaciones -------------------------------------------------------------------------------------

    const renderedCargos = !isProductividad && (
        <>
            <span> - </span>
            <p className="container__single-empleado_header-cargo">
                {empleado.cargo.toUpperCase()}
            </p>
        </>
    );

    const renderedNames = (
        <h2 className="container__single-empleado_header-nombre">
            {`${CapitalizeEveryFirstLetter(empleado.nombres)} 
        ${CapitalizeEveryFirstLetter(empleado.apellidos)}`}
        </h2>
    );

    const renderedContratadoStateOrProd = isProductividad ? (
        <p>{empleado.puntaje}</p>
    ) : (
        <p
            className={`container__single-empleado_header-contratado 
            container__single-empleado_header-contratado_${empleado.contratado}`}
        >
            {empleado.contratado
                ? messages.SINGLE_EMPLEADO_CONTRATADO
                : messages.SINGLE_EMPLEADO_NO_CONTRATADO}
        </p>
    );

    const renderedDeleteButton = !isProductividad && (
        <button
            className="container__single-empleado_info-deletebtn"
            aria-label={messages.MENU_EMPLEADOS_BORRAR_EMPLEADO}
            onClick={() => setShowConfirmModal(true)}
            disabled={isDeleting}
        >
            {<FontAwesomeIcon icon={faTrash} />}
        </button>
    );

    const renderedUpdateButton = (
        <Link
            to={`${routes.PATH_UPDATE_EMPLEADO}/${empleado._id}`}
            className="container__single-empleado_info-updatebtn"
            aria-label={messages.MENU_EMPLEADOS_BORRAR_EMPLEADO}
        >
            {<FontAwesomeIcon icon={faEdit} />}
        </Link>
    );

    const renderedToggleInfoState = (
        <FontAwesomeIcon
            icon={faCaretDown}
            flip={showInfo ? "vertical" : false}
            size="xl"
        />
    );

    const renderedRegistrationDate = (
        <div className="container__single-empleado_info-row">
            <div>
                <aside>{messages.SINGLE_EMPLEADO_FECHA_CREACION}</aside>
                <p>
                    {new Date(empleado.createdAt).toLocaleDateString("es-AR")}
                </p>
            </div>
        </div>
    );

    const productividad = isProductividad && (
        <div className="container__single-empleado_info-row">
            <h3>{messages.SINGLE_EMPLEADO_PROD}</h3>
            <div>
                <aside>{messages.SINGLE_EMPLEADO_N_REPARACIONES}</aside>
                <p>{empleado.nReparaciones}</p>
            </div>
            <div>
                <aside>{messages.SINGLE_EMPLEADO_N_REPARACIONES_HORAS}</aside>
                <p>{empleado.horasTotalesReparaciones} hs</p>
            </div>
        </div>
    );

    const renderedPersonalInfo = (
        <div className="container__single-empleado_info-row">
            <h3>{messages.SINGLE_EMPLEADO_INFO_PERSONAL}</h3>
            {/* Fecha de nacimiento */}
            <div>
                <aside>{messages.SINGLE_EMPLEADO_FECHA_NACIMIENTO}</aside>
                <p className="container__single-empleado_info-row_data">
                    {new Date(empleado.fechaNacimiento).toLocaleDateString(
                        "es-AR"
                    )}
                </p>
            </div>
        </div>
    );

    const renderedAddress = (
        <div className="container__single-empleado_info-row">
            <h3>{messages.SINGLE_EMPLEADO_DIRECCION}</h3>
            {/* Pais */}
            <div>
                <aside>{messages.SINGLE_EMPLEADO_PAIS}</aside>
                <p className="container__single-empleado_info-row_data">
                    {CapitalizeEveryFirstLetter(empleado.direccion.pais)}
                </p>
            </div>
            {/* Ciudad */}
            <div>
                <aside>{messages.SINGLE_EMPLEADO_CIUDAD}</aside>
                <p className="container__single-empleado_info-row_data">
                    {CapitalizeEveryFirstLetter(empleado.direccion.ciudad)}
                </p>
            </div>
            {/* Calle y numero */}
            <div>
                <aside>{messages.SINGLE_EMPLEADO_CALLE_ALTURA}</aside>
                <p className="container__single-empleado_info-row_data">
                    {`${CapitalizeEveryFirstLetter(empleado.direccion.calle)}, 
                    ${empleado.direccion.numero}`}
                </p>
            </div>
        </div>
    );

    const renderedContacto = (
        <div className="container__single-empleado_info-row">
            <h3>{messages.SINGLE_EMPLEADO_CONTACTO}</h3>
            {/* Telefono */}
            <div>
                <aside>{messages.SINGLE_EMPLEADO_TELEFONO}</aside>
                <p className="container__single-empleado_info-row_data">
                    {empleado.telefono}
                </p>
            </div>
            {/* Email */}
            <div>
                <aside>{messages.SINGLE_EMPLEADO_EMAIL}</aside>
                <a
                    href={`mailto:${empleado.email}`}
                    className="container__single-empleado_info-row_data"
                >
                    {empleado.email}
                </a>
            </div>
        </div>
    );

    const renderedInfo = showInfo && (
        <div className="container__single-empleado_info swing-in">
            <div className="container__single-empleado_info-left">
                {/* Informacion personal */}
                {renderedPersonalInfo}
                {/* Direccion */}
                {renderedAddress}
                {/* Contacto */}
                {renderedContacto}
            </div>
            <div className="container__single-empleado_info-right">
                {renderedRegistrationDate}
                {productividad}
            </div>
        </div>
    );

    return (
        <article className="container__single-empleado">
            {/* Header */}
            <div className="container__single-empleado_header">
                <button
                    className="container__single-empleado_header-toggleinfo"
                    onClick={() => setShowInfo((prevInfo) => !prevInfo)}
                >
                    <div>
                        {renderedNames} {renderedCargos}
                    </div>
                    <div>
                        {renderedContratadoStateOrProd}
                        {renderedToggleInfoState}
                    </div>
                </button>
                <div className="container__single-empleado_header-actionbtns">
                    {renderedDeleteButton}
                    {renderedUpdateButton}
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
