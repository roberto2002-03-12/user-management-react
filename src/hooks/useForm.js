import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {})  => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);
  //resetea el formulario cuando se cambia el formulario
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  //formValidation debe estar vacio para saber si esta bien
  const isFormValid = useMemo(() => {

    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  //crear los inputs y permitir cambios
  const onInputChange = ({target}) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  //resetear formulario
  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};
    //obtener los parametros que se quiere evaluar
    for (const formField of Object.keys(formValidations)) {
      //destructurar formValidations
      const [fn, errorMessage] = formValidations[formField];
      //si esta bien no sucede nada, si no lo esta mostrar mensaje de error
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  }
}