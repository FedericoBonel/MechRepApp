import { useState } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faClose } from "@fortawesome/free-solid-svg-icons";

import "./FormularioEmpleados.css";
import { messages } from "../../assets/messages/";

import { empleadosValidator, constantsValidator } from "../../utils/validators";
import { routes } from "../../routes/";
import { cargosData, ciudadesData, empleadosData } from "../../hooks/data";
import apiConstants from "../../api/Constants";
import { Input, Select } from "../../components";

const PAIS = process.env.PAIS_VALIDO || "Argentina";

// Definicion de constantes

const limitFechaNacimiento = new Date();
limitFechaNacimiento.setFullYear(
    new Date().getFullYear() -
        constantsValidator.VALORES.EMPL_MIN_VALUE_YEARS_BIRTHDATE
);

const formInitialState = {
    nombres: "",
    apellidos: "",
    fechaNacimiento: undefined,
    email: "",
    pais: PAIS,
    ciudad: "",
    calle: "",
    numero: undefined,
    cargo: "",
    password: "",
    passwordConfirmar: "",
    telefono: "",
};

const touchedInitialState = {
    nombres: false,
    apellidos: false,
    email: false,
    ciudad: false,
    calle: false,
    numero: false,
    cargo: false,
    password: false,
    passwordConfirmar: false,
    telefono: false,
};

/**
 * Pagina del formulario de registro de empleados
 */
const FormularioEmpleados = () => {
    const queryClient = useQueryClient();
    // Estados ----------------------------------------------------------------------------------

    // Estado que mantiene seguimiento los datos subidos al formulario
    const [form, setForm] = useState(formInitialState);

    // Estado que mantiene seguimiento de que campos fueron tocados por lo menos una vez
    const [touched, setTouched] = useState(touchedInitialState);

    // Validaciones -----------------------------------------------------------------------------

    // Valida el formulario devolviendo un objeto que contiene los campos
    // y un booleano de error marcando si el valor ingresado es correcto o no
    const validateForm = (form) => ({
        nombres: empleadosValidator.isNombres(form.nombres),
        apellidos: empleadosValidator.isApellidos(form.apellidos),
        email: empleadosValidator.isEmail(form.email),
        ciudad: form.ciudad !== "",
        calle: empleadosValidator.isCalle(form.calle),
        numero: empleadosValidator.isNumero(form.numero),
        cargo: form.cargo !== "",
        password: empleadosValidator.isPassword(form.password),
        passwordConfirmar:
            form.password === form.passwordConfirmar &&
            form.passwordConfirmar.length,
        telefono: empleadosValidator.isTelefono(form.telefono),
        fechaNacimiento: empleadosValidator.isFechaNacimiento(
            form.fechaNacimiento
        ),
    });
    const isFormFieldValid = validateForm(form);
    const canSubmit = Object.keys(isFormFieldValid).every(
        (formField) => isFormFieldValid[formField]
    );

    // Funcion que determina si un campo deberia ser marcado como incorrecto o no en la UI:
    // si el campo fue tocado por lo menos una vez y el valor ingresado fue incorrecto
    const shouldShowWarning = (fieldName) =>
        !isFormFieldValid[fieldName] && touched[fieldName];

    // Interacciones con la API ---------------------------------------------------------------

    const {
        mutate: createEmpleado,
        isSuccess: empleadoIsSuccess,
        isLoading: empleadoIsLoading,
        isError: empleadoIsError,
        error: empleadoError,
    } = empleadosData.useCreateEmpleado(() => {
        queryClient.invalidateQueries({
            queryKey: apiConstants.EMPLEADOS_CACHE,
        });
        setForm(formInitialState);
        setTouched(touchedInitialState);
    });

    const {
        isLoading: cargoIsLoading,
        data: cargos,
        isSuccess: cargoIsSuccess,
    } = cargosData.useCargosData();

    const {
        isLoading: ciudadIsLoading,
        data: ciudades,
        isSuccess: ciudadIsSuccess,
    } = ciudadesData.useCiudadesData();

    // Handlers de eventos --------------------------------------------------------------------

    // Mantiene seguimiento de si algun campo fue tocado almenos una vez
    const onBlur = (e) => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            [e.target.name]: true,
        }));
    };

    // Maneja el cambio de los campos del formulario
    const onChange = (e) =>
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));

    // Maneja el envio del formulario
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!canSubmit) {
            return;
        }

        createEmpleado({
            nombres: form.nombres,
            apellidos: form.apellidos,
            email: form.email,
            fechaNacimiento: form.fechaNacimiento.toISOString(),
            direccion: {
                pais: form.pais,
                ciudad: form.ciudad,
                calle: form.calle,
                numero: form.numero,
            },
            cargo: form.cargo,
            password: form.password,
            telefono: form.telefono,
        });
    };

    // Renderizaciones --------------------------------------------------------------------

    let renderedSubmitStatus = "";
    if (empleadoIsError) {
        if (
            400 <= empleadoError.response?.status &&
            empleadoError.response?.status < 500
        ) {
            renderedSubmitStatus = (
                <p className="container__form-alert">
                    {empleadoError.response.data.errorMsg} <br />
                    {empleadoError.response.data.errors?.map((error) => (
                        <>
                            {error.msg}
                            <br />
                        </>
                    ))}
                </p>
            );
        }
    } else if (empleadoIsSuccess) {
        renderedSubmitStatus = (
            <p className="container__form-success">
                {messages.EMPLEADO_CREADO_EXITO}
            </p>
        );
    }

    const renderedForm = (
        <form onSubmit={onSubmit}>
            <div className="container__form-empleados_card-row">
                {/* Nombres */}
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_NOMBRES}
                    showWarning={shouldShowWarning("nombres")}
                    setValue={onChange}
                    label={messages.NOMBRES}
                    name="nombres"
                    minlength={
                        constantsValidator.VALORES.EMPL_MIN_LENGTH_NOMBRES
                    }
                    maxlength={
                        constantsValidator.VALORES.EMPL_MAX_LENGTH_NOMBRES
                    }
                    warning={messages.HINT_NOMBRES}
                    value={form.nombres}
                    onBlur={onBlur}
                    className="container_form-empleados_card-row_left"
                />
                {/* Apellidos */}
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_APELLIDOS}
                    showWarning={shouldShowWarning("apellidos")}
                    setValue={onChange}
                    label={messages.APELLIDOS}
                    name="apellidos"
                    minlength={
                        constantsValidator.VALORES.EMPL_MIN_LENGTH_APELLIDOS
                    }
                    maxlength={
                        constantsValidator.VALORES.EMPL_MAX_LENGTH_APELLIDOS
                    }
                    warning={messages.HINT_APELLIDOS}
                    value={form.apellidos}
                    onBlur={onBlur}
                    className="container_form-empleados_card-row_right"
                />
            </div>
            <div className="container__form-empleados_card-row">
                {/* Fecha de nacimiento */}
                <Input
                    label={messages.FECHA_NACIMIENTO}
                    value={form.fechaNacimiento}
                    setValue={(date) => {
                        setForm((prevForm) => ({
                            ...prevForm,
                            fechaNacimiento: date,
                        }));
                    }}
                    maxDate={limitFechaNacimiento}
                    warning={messages.HINT_FECHA_NACIMIENTO}
                    placeholder={`${messages.PLACEHOLDER_FECHA_NACIMIENTO}`}
                    type="date"
                    required={true}
                    className="container_form-empleados_card-row_left"
                />
                {/* Cargo */}
                {cargoIsSuccess && (
                    <Select
                        required={true}
                        showWarning={shouldShowWarning("cargo")}
                        label={messages.CARGO}
                        options={cargos.data.map((cargo) => cargo.nombre)}
                        value={form.cargo}
                        setValue={onChange}
                        name="cargo"
                        noSelection={messages.SELECT_CARGO_DEFAULT}
                        onBlur={onBlur}
                        className="container_form-empleados_card-row_right"
                    />
                )}
            </div>
            <div className="container__form-empleados_card-row">
                {/* Email */}
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_EMAIL}
                    showWarning={shouldShowWarning("email")}
                    setValue={onChange}
                    label={messages.EMAIL}
                    name="email"
                    minlength={constantsValidator.VALORES.EMPL_MIN_LENGTH_EMAIL}
                    maxlength={constantsValidator.VALORES.EMPL_MAX_LENGTH_EMAIL}
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
                    label={messages.TELEFONO}
                    name="telefono"
                    minlength={constantsValidator.VALORES.EMPL_LENGTH_TELEFONO}
                    maxlength={constantsValidator.VALORES.EMPL_LENGTH_TELEFONO}
                    warning={messages.HINT_TELEFONO}
                    type={"tel"}
                    value={form.telefono}
                    onBlur={onBlur}
                    className="container_form-empleados_card-row_right"
                />
            </div>
            <div className="container__form-empleados_card-row">
                {/* Pais */}
                <Input
                    setValue={onChange}
                    label={messages.PAIS}
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
                        label={messages.CIUDAD}
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
            <div className="container__form-empleados_card-row">
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_CALLE}
                    showWarning={shouldShowWarning("calle")}
                    setValue={onChange}
                    label={messages.CALLE}
                    name="calle"
                    minlength={constantsValidator.VALORES.EMPL_MIN_LENGTH_CALLE}
                    maxlength={constantsValidator.VALORES.EMPL_MAX_LENGTH_CALLE}
                    type={"text"}
                    warning={messages.HINT_CALLE}
                    value={form.calle}
                    className="container__form-empleados_card-row_calle container_form-empleados_card-row_left"
                    onBlur={onBlur}
                />
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_ALTURA}
                    showWarning={shouldShowWarning("numero")}
                    setValue={onChange}
                    label={messages.ALTURA}
                    name="numero"
                    min={constantsValidator.VALORES.EMPL_MIN_VALUE_NUMERO}
                    max={constantsValidator.VALORES.EMPL_MAX_VALUE_NUMERO}
                    type={"number"}
                    warning={messages.HINT_ALTURA}
                    value={form.numero}
                    className="container__form-empleados_card-row_altura"
                    onBlur={onBlur}
                />
            </div>
            <div className="container__form-empleados_card-row">
                {/* Clave */}
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_CLAVE}
                    showWarning={shouldShowWarning("password")}
                    setValue={onChange}
                    label={messages.CLAVE}
                    name="password"
                    minlength={
                        constantsValidator.VALORES.EMPL_MIN_LENGTH_PASSWORD
                    }
                    maxlength={
                        constantsValidator.VALORES.EMPL_MAX_LENGTH_PASSWORD
                    }
                    warning={messages.HINT_CLAVE}
                    type={"password"}
                    value={form.password}
                    onBlur={onBlur}
                    className="container_form-empleados_card-row_left"
                />
                {/* Confirmacion de clave */}
                <Input
                    required={true}
                    placeholder={messages.PLACEHOLDER_CLAVE}
                    showWarning={shouldShowWarning("passwordConfirmar")}
                    setValue={onChange}
                    label={messages.CONFIRMAR_CLAVE}
                    name="passwordConfirmar"
                    minlength={
                        constantsValidator.VALORES.EMPL_MIN_LENGTH_PASSWORD
                    }
                    maxlength={
                        constantsValidator.VALORES.EMPL_MAX_LENGTH_PASSWORD
                    }
                    warning={messages.HINT_CONFIRMARCLAVE}
                    type={"password"}
                    value={form.passwordConfirmar}
                    onBlur={onBlur}
                    className="container_form-empleados_card-row_right"
                />
            </div>
            {/* Botones de confirmacion */}
            <div className="container__form-empleados_card-btns">
                <Link
                    className="container__button-cancelar"
                    to={routes.PATH_EMPLEADOS}
                >
                    {messages.CANCELAR}
                </Link>
                <button
                    className="container__button-aceptar"
                    disabled={!canSubmit || empleadoIsLoading}
                >
                    {empleadoIsLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                        messages.REGISTRAR
                    )}
                </button>
            </div>
            {renderedSubmitStatus}
        </form>
    );

    return (
        <main className="container__form-empleados">
            <div className="container__form-empleados_card">
                <div className="container__form-empleados_card-header">
                    <h1>{messages.NEW_EMPLEADO}</h1>
                    <Link to={routes.PATH_EMPLEADOS}>
                        <FontAwesomeIcon icon={faClose} size="xl" />
                    </Link>
                </div>
                {cargoIsSuccess && ciudadIsSuccess && renderedForm}
                {(cargoIsLoading || ciudadIsLoading) && (
                    <div className="container__loading-msg">
                        <p>{messages.CARGANDO_CARGOS_CIUDADES}</p>
                        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    </div>
                )}
            </div>
        </main>
    );
};

export default FormularioEmpleados;
