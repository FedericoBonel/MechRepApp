import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faFilter } from "@fortawesome/free-solid-svg-icons";

import "./ProductividadEmpleados.css";
import { Input, SingleEmpleado, BarChart } from "../../components";
import { messages } from "../../assets/messages/";
import { productividadData } from "../../hooks/data";

const now = new Date();
const maxDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1)
);

/**
 * Componente del menu de productividad de empleados
 */
const ProductividadEmpleados = () => {
    // Estados -------------------------------------------------------------------------
    const [prodDate, setProdDate] = useState(maxDate);

    // Interacciones con api -----------------------------------------------------------
    const {
        isLoading: prodIsLoading,
        data: prods,
        isSuccess: prodIsSuccess,
        fetchNextPage: getNextProdPage,
        hasNextPage: prodHasNextPage,
        isFetchingNextPage: prodIsLoadingMore,
    } = productividadData.useInfiniteProductividadData(prodDate);

    // Handlers de eventos -------------------------------------------------------------
    const onSelectDateFilter = (date) =>
        setProdDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1)));

    // Renderizaciones -----------------------------------------------------------------
    const renderedDateFilter = (
        <>
            <h2 className="container__prod-empleados_card-menu_name">
                {messages.PROD_EMPLEADOS_FILTROS}{" "}
                {<FontAwesomeIcon icon={faFilter} />}
            </h2>
            <div>
                <h3 className="container__prod-empleados_card-menu_propname">
                    {messages.PROD_EMPLEADOS_FILTRAR_FECHA}
                </h3>
                <Input
                    type="month"
                    value={prodDate}
                    maxDate={maxDate}
                    setValue={onSelectDateFilter}
                />
            </div>
        </>
    );

    const top5 = prodIsSuccess ? prods.pages[0].data.slice(0, 5) : [];

    const renderedBarChart = prodIsSuccess && (
        <div className="container__prod-empleados_card-list_chart">
            <BarChart
                chartData={{
                    labels: top5.map(
                        (prod) =>
                            `${prod.empleado.nombres} ${prod.empleado.apellidos}`
                    ),
                    datasets: [
                        {
                            label: "Productividad mensual",
                            data: top5.map((prod) => prod.puntaje),
                            backgroundColor: ["#0060a3"],
                        },
                    ],
                }}
            />
        </div>
    );

    const renderedProd =
        prodIsSuccess &&
        prods.pages.map((page) =>
            page.data.map((prod) => (
                <SingleEmpleado
                    key={prod.empleado._id}
                    isProductividad
                    empleado={{
                        ...prod.empleado,
                        puntaje: prod.puntaje,
                        nReparaciones: prod.nReparaciones,
                        horasTotalesReparaciones: prod.horasTotalesReparaciones,
                    }}
                />
            ))
        );

    const renderedLoadMoreBtn =
        prodIsSuccess &&
        (prods.pages[0]?.numberHits ? (
            prodHasNextPage ? (
                <button
                    onClick={() => getNextProdPage()}
                    className="container__button-load_more"
                >
                    {prodIsLoadingMore ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                        messages.PROD_EMPLEADOS_SIGUIENTE_PAG_EMPLEADOS
                    )}
                </button>
            ) : (
                <p className="container__loading-msg">
                    {messages.PROD_EMPLEADOS_NO_MAS_EMPLEADOS}
                </p>
            )
        ) : (
            <p className="container__loading-msg">
                {messages.PROD_EMPLEADOS_NO_EMPLEADOS}
            </p>
        ));

    return (
        <main className="container__prod-empleados">
            <div className="container__prod-empleados_card">
                {/* Encabezado */}
                <div className="container__prod-empleados_card-top">
                    <div>
                        <h1>{messages.PROD_EMPLEADOS_TITLE}</h1>
                    </div>
                </div>
                {/* Contenido */}
                <div className="container__prod-empleados_card-bottom">
                    {/* Opciones de filtrado */}
                    <div className="container__prod-empleados_card-menu">
                        <div className="container__prod-empleados_card-menu_card">
                            {renderedDateFilter}
                        </div>
                    </div>
                    {/* Lista */}
                    <div className="container__prod-empleados_card-list">
                        {renderedBarChart}
                        {prodIsLoading && (
                            <div className="container__loading-msg">
                                <p>{messages.PROD_EMPLEADOS_CARGANDO}</p>
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    size={"2x"}
                                />
                            </div>
                        )}
                        {prodIsSuccess && renderedProd}
                        {renderedLoadMoreBtn}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductividadEmpleados;
