import { useState, useCallback } from 'react';

const useForm = () => {
    const [isValidatedForm, setIsValidatedForm] = useState(false);
    const [userNewValues, setUserNewValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setIsValidatedForm(event.target.closest('form').checkValidity());

        setUserNewValues({
            ...userNewValues,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: event.target.validationMessage,
        });
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newisValidatedForm = false) => {
            setUserNewValues(newValues);
            setErrors(newErrors);
            setIsValidatedForm(newisValidatedForm);
        },
        [setUserNewValues, setErrors, setIsValidatedForm]
    );

    return {
        userNewValues,
        errors,
        handleChange,
        isValidatedForm,
        resetForm,
    };
};

export default useForm;
