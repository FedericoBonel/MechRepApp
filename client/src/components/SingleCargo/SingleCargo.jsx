import "./SingleCargo.css";
import { messages } from "../../assets/messages";

/**
 * Componente de un item de cargo de la lista de cargos 
 */
const SingleCargo = ({ cargo }) => {
    // Acciones permitidas del cargo
    const renderedAcciones = (
        <div className="container__single-cargo_acciones">
            <p className="container__single-cargo_acciones-name">
                {messages.MENU_CARGOS_ACCIONES}
            </p>
            <ul>
                {cargo.acciones.map((accion) => (
                    <li
                        key={accion._id}
                        className="container__single-cargo_acciones-verb"
                    >
                        {accion.verbo}
                    </li>
                ))}
            </ul>
        </div>
    );

    // Fecha de creacion
    const renderedCreationDate = (
        <p>{`${messages.MENU_CARGOS_FECHA_CREACION} ${new Date(
            cargo.createdAt
        ).toLocaleDateString("es-AR")}`}</p>
    );

    return (
        <article className="container__single-cargo">
            <hr />
            <h2>{`${messages.MENU_CARGOS_NOMBRE} ${cargo.nombre}`}</h2>
            <div className="container__single-cargo_desc">
                {renderedAcciones}
                {renderedCreationDate}
            </div>
        </article>
    );
};

export default SingleCargo;
