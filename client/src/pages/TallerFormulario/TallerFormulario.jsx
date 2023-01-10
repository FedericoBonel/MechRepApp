import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./TallerFormulario.css";
import { messages } from "../../assets/messages/";
import {
    tallerValidator,
    direccionValidator,
    contactoValidator,
    constantsValidator,
} from "../../utils/validators";
import { ciudadesData, tallerData } from "../../hooks/data";
import apiConstants from "../../api/Constants";
import { Input, Select } from "../../components";
import { routes } from "../../routes";

const PAIS = process.env.PAIS_VALIDO || "Argentina";

const formInitialState = {
    nombre: "",
    email: "",
    pais: PAIS,
    ciudad: "",
    calle: "",
    numero: undefined,
    telefono: "",
};

const touchedInitialState = {
    nombre: false,
    email: false,
    pais: false,
    ciudad: false,
    calle: false,
    numero: undefined,
    telefono: false,
};

/**
 * Componente de la pagina del formulario del taller
 */
const TallerFormulario = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // Estados ----------------------------------------------------------------------------------
    const [form, setForm] = useState(formInitialState);
    // Estado que mantiene seguimiento de que campos fueron tocados por lo menos una vez
    const [touched, setTouched] = useState(touchedInitialState);

    // Validaciones -----------------------------------------------------------------------------
    const validateForm = (form) => ({
        nombre: tallerValidator.isNombre(form.nombre),
        email: contactoValidator.isEmail(form.email),
        ciudad: form.ciudad !== "",
        calle: direccionValidator.isCalle(form.calle),
        numero: direccionValidator.isNumero(form.numero),
        telefono: contactoValidator.isTelefono(form.telefono),
    });
    const isFormFieldValid = validateForm(form);
    const canSubmit = Object.keys(isFormFieldValid).every(
        (formField) => isFormFieldValid[formField]
    );

    const shouldShowWarning = (fieldName) =>
        !isFormFieldValid[fieldName] && touched[fieldName];
    // Interacciones con la API ---------------------------------------------------------------
    const {
        isLoading: ciudadIsLoading,
        data: ciudades,
        isSuccess: ciudadIsSuccess,
    } = ciudadesData.useCiudadesData();

    const {
        mutate: postTaller,
        isLoading: tallerIsLoading,
        isSuccess: tallerIsSuccess,
    } = tallerData.useCreateTaller(() =>
        queryClient.invalidateQueries({ queryKey: apiConstants.TALLER_CACHE })
    );

    useEffect(() => {
        if (tallerIsSuccess) {
            navigate(routes.PATH_HOME);
        }
    }, [navigate, tallerIsSuccess]);

    // Handlers de eventos --------------------------------------------------------------------
    const onBlur = (e) => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            [e.target.name]: true,
        }));
    };

    const onChange = (e) =>
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));

    const onSubmit = (e) => {
        e.preventDefault();

        postTaller({
            nombre: form.nombre,
            direccion: {
                pais: form.pais,
                calle: form.calle,
                ciudad: form.ciudad,
                numero: form.numero,
            },
            telefono: form.telefono,
            email: form.email,
        });
    };

    // Renderizaciones ----------------------------------------------------------------------
    const renderedForm = (
        <form onSubmit={onSubmit}>
            <div className="container__form-taller_card-row">
                {/* Nombre */}
                <Input
                    required={true}
                    placeholder={messages.TALLER_FORM_PLACEHOLDER_NOMBRE}
                    showWarning={shouldShowWarning("nombre")}
                    setValue={onChange}
                    label={messages.TALLER_FORM_NOMBRE}
                    name="nombre"
                    minlength={
                        constantsValidator.VALORES.TALLER_MIN_LENGTH_NOMBRE
                    }
                    maxlength={
                        constantsValidator.VALORES.TALLER_MAX_LENGTH_NOMBRE
                    }
                    warning={messages.TALLER_FORM_HINT_NOMBRE}
                    value={form.nombre}
                    onBlur={onBlur}
                    className="container_form-empleados_card-row_right"
                />
            </div>
            <div className="container__form-taller_card-row">
                {/* Email */}
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_EMAIL}
                    showWarning={shouldShowWarning("email")}
                    setValue={onChange}
                    label={messages.TALLER_FORM_EMAIL}
                    name="email"
                    minlength={
                        constantsValidator.VALORES.TALLER_MIN_LENGTH_EMAIL
                    }
                    maxlength={
                        constantsValidator.VALORES.TALLER_MAX_LENGTH_EMAIL
                    }
                    warning={messages.HINT_EMAIL}
                    type={"email"}
                    value={form.email}
                    onBlur={onBlur}
                    className="container_form-empleados_card-row_left"
                />
                {/* Telefono */}
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_TELEFONO}
                    showWarning={shouldShowWarning("telefono")}
                    setValue={onChange}
                    label={messages.TALLER_FORM_TELEFONO}
                    name="telefono"
                    minlength={
                        constantsValidator.VALORES.TALLER_LENGTH_TELEFONO
                    }
                    maxlength={
                        constantsValidator.VALORES.TALLER_LENGTH_TELEFONO
                    }
                    warning={messages.HINT_TELEFONO}
                    type={"tel"}
                    value={form.telefono}
                    onBlur={onBlur}
                    className="container_form-empleados_card-row_right"
                />
            </div>
            <div className="container__form-taller_card-row">
                {/* Pais */}
                <Input
                    setValue={onChange}
                    label={messages.TALLER_FORM_PAIS}
                    name={`pais`}
                    type={"text"}
                    value={form.pais}
                    disabled={true}
                    className="container_form-empleados_card-row_left"
                />
                {/* Ciudad */}
                {ciudadIsSuccess && (
                    <Select
                        required={true}
                        showWarning={shouldShowWarning("ciudad")}
                        label={messages.TALLER_FORM_CIUDAD}
                        options={ciudades.data.map((ciudad) => ciudad.name)}
                        value={form.ciudad}
                        setValue={onChange}
                        name="ciudad"
                        noSelection={messages.SELECT_CIUDAD_DEFAULT}
                        onBlur={onBlur}
                        className="container_form-empleados_card-row_right"
                    />
                )}
            </div>
            {/* Calle y numero */}
            <div className="container__form-taller_card-row">
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_CALLE}
                    showWarning={shouldShowWarning("calle")}
                    setValue={onChange}
                    label={messages.TALLER_FORM_CALLE}
                    name="calle"
                    minlength={
                        constantsValidator.VALORES.TALLER_MIN_LENGTH_CALLE
                    }
                    maxlength={
                        constantsValidator.VALORES.TALLER_MAX_LENGTH_CALLE
                    }
                    type={"text"}
                    warning={messages.HINT_CALLE}
                    value={form.calle}
                    className="container__form-taller_card-row_calle container_form-empleados_card-row_left"
                    onBlur={onBlur}
                />
                <Input
                    required={true}
                    placeholder={messages.TALLER_FORM_ALTURA}
                    showWarning={shouldShowWarning("numero")}
                    setValue={onChange}
                    label={messages.ALTURA}
                    name="numero"
                    min={constantsValidator.VALORES.TALLER_MIN_VALUE_NUMERO}
                    max={constantsValidator.VALORES.TALLER_MAX_VALUE_NUMERO}
                    type={"number"}
                    warning={messages.HINT_ALTURA}
                    value={form.numero}
                    className="container__form-taller_card-row_altura"
                    onBlur={onBlur}
                />
            </div>
            {/* Botones de confirmacion */}
            <div className="container__form-taller_card-btns">
                <button
                    className="container__button-aceptar"
                    disabled={!canSubmit || tallerIsLoading}
                >
                    {tallerIsLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                        messages.REGISTRAR
                    )}
                </button>
            </div>
        </form>
    );

    return (
        <main className="container__form-taller">
            <div className="container__form-taller_card">
                <div className="container__form-taller_card-header">
                    <h1>{messages.TALLER_FORM_TITLE}</h1>
                </div>
                <small>{messages.TALLER_FORM_SUBTITLE}</small>
                {ciudadIsSuccess && renderedForm}
                {ciudadIsLoading && (
                    <div className="container__loading-msg">
                        <p>{messages.CARGANDO_CIUDADES}</p>
                        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    </div>
                )}
            </div>
        </main>
    );
};

export default TallerFormulario;
