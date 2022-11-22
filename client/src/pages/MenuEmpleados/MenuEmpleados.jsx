import { useState } from "react";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSpinner,
    faFilter,
    faCaretSquareUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import "./MenuEmpleados.css";
import { SingleEmpleado, Select } from "../../components";
import { messages } from "../../assets/messages/";
import apiConstants from "../../api/Constants";
import empleadosApi from "../../api/EmpleadosAPI";
import cargosApi from "../../api/CargosAPI";
import { routes } from "../../routes/";

/**
 * Componente del menu de gestion de empleados
 */
const MenuEmpleados = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // Estados ---------------------------------------------------------------
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filterCargoSelected, setFilterCargoSelected] = useState("");

    // Interacciones con API -------------------------------------------------
    const {
        isLoading: empleadosIsLoading,
        isError: empleadosIsError,
        error: empleadosError,
        data: empleados,
        isSuccess: empleadoIsSuccess,
        fetchNextPage: getNextEmpleadosPage,
        hasNextPage: empleadosHasNextPage,
        isFetchingNextPage: empleadosIsLoadingMore,
    } = useInfiniteQuery({
        queryKey: [apiConstants.EMPLEADOS_CACHE, filterCargoSelected],
        queryFn: ({ pageParam = 1 }) =>
            empleadosApi.getEmpleados(filterCargoSelected, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            // Si la ultima pagina tuvo resultados agrega una pagina mas
            lastPage.numberHits ? allPages.length + 1 : undefined,
    });

    if (empleadosIsError) {
        navigate(
            `${routes.PATH_ERROR}/${
                empleadosIsError.response
                    ? empleadosError.response.status
                    : "500"
            }`
        );
    }

    const {
        isLoading: cargoIsLoading,
        isError: cargoIsError,
        error: cargoError,
        data: cargos,
        isSuccess: cargoIsSuccess,
    } = useQuery(apiConstants.CARGOS_CACHE, cargosApi.getCargos);

    if (cargoIsError) {
        navigate(
            `${routes.PATH_ERROR}/${
                cargoIsError.response ? cargoError.response.status : "500"
            }`
        );
    }

    // Handlers de eventos ---------------------------------------------------
    const onClickFilter = () => setShowFilterMenu((prevShow) => !prevShow);
    const onSelectFilter = (e) => setFilterCargoSelected(e.target.value);

    // Renderizaciones -------------------------------------------------------
    let renderedEmpleados;
    let renderedLoadMoreBtn;
    if (empleadoIsSuccess) {
        if (empleados.pages.length) {
            renderedEmpleados = empleados.pages.map((grupo) =>
                grupo.data.map((empleado) => (
                    <SingleEmpleado key={empleado._id} empleado={empleado} />
                ))
            );
        }

        // Si no se encontro nada en la base de datos en la primera pagina
        // Mostra un mensaje acorde, si no mostra un boton de carga
        if (!empleados.pages[0].numberHits) {
            renderedLoadMoreBtn = (
                <p className="container__loading-msg">
                    {messages.MENU_EMPLEADOS_NO_EMPLEADOS}
                </p>
            );
        } else {
            if (empleadosHasNextPage) {
                renderedLoadMoreBtn = (
                    <button
                        onClick={() => getNextEmpleadosPage()}
                        className="container__button-load_more"
                    >
                        {empleadosIsLoadingMore ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            messages.MENU_EMPLEADOS_SIGUIENTE_PAG_EMPLEADOS
                        )}
                    </button>
                );
            } else {
                renderedLoadMoreBtn = (
                    <p className="container__loading-msg">
                        {messages.MENU_EMPLEADOS_NO_MAS_EMPLEADOS}
                    </p>
                );
            }
        }
    }

    let renderedFilterMenu;
    if (showFilterMenu) {
        if (cargoIsSuccess) {
            let cargosOptions = cargos?.data.map((cargo) => cargo.nombre);
            // Adjunta la opcion de reseteo de seleccion
            cargosOptions.push("");
            renderedFilterMenu = (
                <div className="container__menu-empleados_card-menu">
                    <p>{messages.MENU_EMPLEADOS_FILTRAR_CARGO}</p>
                    <Select
                        className="container__menu-empleados_card-menu_select"
                        value={filterCargoSelected}
                        setValue={onSelectFilter}
                        options={cargosOptions}
                        noSelection={messages.SELECT_CARGO_DEFAULT}
                    />
                </div>
            );
        } else if (cargoIsLoading) {
            renderedFilterMenu = (
                <FontAwesomeIcon icon={faSpinner} spin size={"2x"} />
            );
        }
    }

    const renderedFilterToggleButton = (
        <button
            onClick={onClickFilter}
            className="container__menu-empleados_card-top_filter"
        >
            <FontAwesomeIcon
                icon={showFilterMenu ? faCaretSquareUp : faFilter}
            />
            {showFilterMenu
                ? ` ${messages.MENU_EMPLEADOS_ESCONDER_FILTROS}`
                : ` ${messages.MENU_EMPLEADOS_MOSTRAR_FILTROS}`}
        </button>
    );

    return (
        <main className="container__menu-empleados">
            <div className="container__menu-empleados_card">
                <div className="container__menu-empleados_card-top">
                    <div>
                        <h1>{messages.MENU_EMPLEADOS_TITLE}</h1>
                        {renderedFilterToggleButton}
                    </div>
                    <Link
                        className="container__button-aceptar"
                        to={routes.PATH_CREATE_EMPLEADO}
                    >
                        {messages.REGISTRAR_EMPLEADO}
                    </Link>
                </div>
                {renderedFilterMenu}
                <div>
                    {empleadosIsLoading && (
                        <div className="container__loading-msg">
                            <p>{messages.MENU_EMPLEADOS_CARGANDO}</p>
                            <FontAwesomeIcon
                                icon={faSpinner}
                                spin
                                size={"2x"}
                            />
                        </div>
                    )}
                    {empleadoIsSuccess && renderedEmpleados}
                </div>
                {renderedLoadMoreBtn}
            </div>
        </main>
    );
};

export default MenuEmpleados;
