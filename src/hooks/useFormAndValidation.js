import { useState, useCallback } from "react";
import isEmail from "validator/lib/isEmail";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = e.target;

    if (name === "email") {
      if (!isEmail(value)) {
        input.setCustomValidity("Некорректый адрес электронной почты.");
      } else {
        input.setCustomValidity("");
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
