import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./Input.css";
import { constantsValidator } from "../../utils/validators/";

const DATE_FORMAT_DAYS = "dd/MM/yyyy";
const DATE_FORMAT_MONTH = "MM/yyyy";

/**
 * Componente personalizado
 * de un input con un descriptor, una etiqueta y un warning
 */
const Input = ({
    required = false,
    placeholder,
    hint = "",
    warning,
    showWarning,
    setValue,
    label,
    name,
    minlength,
    maxlength,
    minDate,
    maxDate,
    min,
    max,
    type = "text",
    disabled = false,
    value = "",
    className,
    onBlur,
}) => {
    let input;
    if (type === "date" || type === "month") {
        input = (
            <DatePicker
                className={`container__input-field${
                    showWarning ? "_warning" : ""
                }`}
                selected={value}
                onChange={setValue}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText={placeholder}
                showYearDropdown
                dropdownMode="select"
                onBlur={onBlur}
                dateFormat={
                    type === "month" ? DATE_FORMAT_MONTH : DATE_FORMAT_DAYS
                }
                showMonthYearPicker={type === "month"}
            />
        );
    } else {
        input = (
            <input
                className={`container__input-field${
                    showWarning ? "_warning" : ""
                }`}
                required={required}
                placeholder={placeholder}
                name={name}
                onChange={setValue}
                type={type}
                minLength={minlength}
                maxLength={maxlength}
                disabled={disabled}
                value={value}
                pattern={
                    type === "tel"
                        ? constantsValidator.TELEFONO_PATTERN
                        : undefined
                }
                min={min}
                max={max}
                onBlur={onBlur}
                checked={type === "checkbox" ? value : undefined}
            />
        );
    }
    return (
        <div className={`container__input ${className}`}>
            {label && (
                <label
                    className={`container__input-label${
                        showWarning ? "_warning" : ""
                    }`}
                    htmlFor={name}
                >{`${label}${required ? " *" : ""}`}</label>
            )}
            {input}
            {hint && (
                <small
                    className={`container__input-hint${
                        showWarning ? "_warning" : ""
                    }`}
                >
                    {hint}
                </small>
            )}
            {showWarning && (
                <small
                    className={`container__input-hint${
                        showWarning ? "_warning" : ""
                    }`}
                >
                    {warning}
                </small>
            )}
        </div>
    );
};
export default Input;
