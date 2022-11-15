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
    return (
        <div className={`container__select ${className}`}>
            {label && (
                <label
                    className={`container__select-label${
                        showWarning ? "_warning" : ""
                    }`}
                    htmlFor={name}
                >{`${label}${required ? " *" : ""}`}</label>
            )}
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
                        {option}
                    </option>
                ))}
            </select>
            {hint && (
                <small
                    className={`container__select-hint${
                        showWarning ? "_warning" : ""
                    }`}
                >
                    {hint}
                </small>
            )}
            {showWarning && <p>{warning}</p>}
        </div>
    );
};

export default Select;
