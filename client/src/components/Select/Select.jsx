import { messages } from "../../assets/messages";
import "./Select.css";

/**
 * Componente personalizado
 * de un elemento Select con un descriptor, una etiqueta y un warning
 */
const Select = ({
    label,
    hint,
    className,
    name,
    required,
    options,
    warning,
    value,
    setValue,
    showWarning,
    noSelection,
    onBlur,
}) => {
    const renderedlabel = label && (
        <label
            className={`container__select-label${
                showWarning ? "_warning" : ""
            }`}
            htmlFor={name}
        >
            {`${label}${required ? " *" : ""}`}
        </label>
    );

    const renderedSelect = (
        <select
            name={name}
            id={name}
            onChange={setValue}
            value={value}
            onBlur={onBlur}
            className={`container__select-field${
                showWarning ? "_warning" : ""
            }`}
        >
            <option value={""} disabled={true}>
                {noSelection}
            </option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option === "" ? messages.RESETEAR_MENU : option}
                </option>
            ))}
        </select>
    );

    const renderedHint = hint && (
        <small
            className={`container__select-hint${showWarning ? "_warning" : ""}`}
        >
            {hint}
        </small>
    );

    const renderedWarning = showWarning && <p>{warning}</p>;

    return (
        <div className={`container__select ${className}`}>
            {renderedlabel}
            {renderedSelect}
            {renderedHint}
            {renderedWarning}
        </div>
    );
};

export default Select;
