import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faFilter } from "@fortawesome/free-solid-svg-icons";

import "./MenuCargos.css";
import { SingleCargo } from "../../components";
import { messages } from "../../assets/messages/";
import { cargosData } from "../../hooks/data";

const MenuCargos = () => {
    // Interacciones con API -------------------------------------------------
    const {
        isLoading: cargoIsLoading,
        data: cargos,
        isSuccess: cargoIsSuccess,
    } = cargosData.useCargosData();

    // Renderizaciones -------------------------------------------------------
    let renderedCargos;
    if (cargoIsSuccess) {
        if (cargos.data.length) {
            renderedCargos = cargos?.data.map((cargo) => (
                <SingleCargo cargo={cargo} key={cargo._id} />
            ));
        } else {
            renderedCargos = (
                <p className="container__loading-msg">
                    {messages.MENU_CARGOS_NO_CARGOS}
                </p>
            );
        }
    }

    return (
        <main className="container__menu-cargos">
            <div className="container__menu-cargos_card">
                <div className="container__menu-cargos_card-top">
                    <h1>{messages.MENU_CARGOS_TITLE}</h1>
                </div>
                <div className="container__menu-cargos_card-bottom">
                    {/* Opciones de filtrado */}
                    <div className="container__menu-cargos_card-menu">
                        <div className="container__menu-cargos_card-menu_card">
                            <h2 className="container__menu-cargos_card-menu_name">
                                {messages.MENU_CARGOS_FILTROS}{" "}
                                {<FontAwesomeIcon icon={faFilter} />}
                            </h2>
                        </div>
                    </div>
                    {/* Lista */}
                    <div className="container__menu-cargos_card-list">
                        {cargoIsLoading && (
                            <div className="container__loading-msg">
                                <p>{messages.MENU_CARGOS_CARGANDO}</p>
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    size={"2x"}
                                />
                            </div>
                        )}
                        {cargoIsSuccess && renderedCargos}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MenuCargos;
