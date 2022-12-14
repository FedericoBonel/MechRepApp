import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./SingleCargo.css";
import { messages } from "../../assets/messages";

/**
 * Componente de un item de cargo de la lista de cargos
 */
const SingleCargo = ({ cargo }) => {
    // Estados ---------------------------------------------------------------------------------------------
    const [showInfo, setShowInfo] = useState(false);

    // Renderizaciones -------------------------------------------------------------------------------------
    const renderedAcciones = (
        <div className="container__single-cargo_info-row">
            <h3>{messages.MENU_CARGOS_ACCIONES}</h3>
            <ul>
                {cargo.acciones.map((accion) => (
                    <li key={accion._id}>{accion.verbo}</li>
                ))}
            </ul>
        </div>
    );

    const renderedRegistrationDate = (
        <div className="container__single-cargo_info-row">
            <aside>{messages.MENU_CARGOS_FECHA_CREACION}</aside>
            <p>{new Date(cargo.createdAt).toLocaleDateString("es-AR")}</p>
        </div>
    );

    const renderedToggleInfoState = (
        <FontAwesomeIcon
            icon={faCaretDown}
            flip={showInfo ? "vertical" : false}
            size="xl"
        />
    );

    const renderedInfo = showInfo && (
        <div className="container__single-cargo_info swing-in">
            <div className="container__single-cargo_info-left">
                {renderedAcciones}
            </div>
            <div className="container__single-cargo_info-right">
                {renderedRegistrationDate}
            </div>
        </div>
    );

    return (
        <article className="container__single-cargo">
            {/* Header */}
            <div className="container__single-cargo_header">
                <button
                    className="container__single-cargo_header-toggleinfo"
                    onClick={() => setShowInfo((prevInfo) => !prevInfo)}
                >
                    <h2 className="container__single-cargo_header-nombre">
                        {cargo.nombre}
                    </h2>
                    {renderedToggleInfoState}
                </button>
            </div>
            {/* Informacion */}
            {renderedInfo}
        </article>
    );
};

export default SingleCargo;
