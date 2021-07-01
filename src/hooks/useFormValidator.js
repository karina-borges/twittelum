import { useState } from "react";

export default function useFormValidator(validations) {
    const [errors, setErrors] = useState(createInitialState());
    const [values, setValues] = useState(createInitialState());
    const [isFormValid, setFormValid] = useState(false);

    function createInitialState() {
        const defaultValues = {};

        for (let prop in validations) {
            defaultValues[prop] = '';
        }

        return defaultValues;
    }

    function validate(event) {
        const { name, value } = event.target;
        errors[name] = validations[name](value);
        values[name] = value;
        let status = Object.entries(values).every(([prop, value]) => {
            return validations[prop](value) === ''
        });
        
        setErrors({ ...errors });
        setValues({ ...values });
        setFormValid(status);
    }

    return { errors, isFormValid, validate };
}