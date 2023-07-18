import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, useAuth } from '../../hooks';
import { TextField, Button } from '@mui/material';

// const userLocal = JSON.parse(localStorage.getItem('user'));

const userInputs = {
  email: ' ',
  password: ''
}

const userInputsValidation = {
  email: [(value) => (value === ' ' ? true : value.includes('@')), 'It must be a valid email'],
  password: [(value) => (!value || value.length >= 8), 'Password must be at least 8 characters long'],
}

export const UpdateAccessInformation = () => {
  const [formSubmited, setFormSubmited] = useState(false);
  const { user } = useSelector(state => state.auth);

  const {
    email, password,
    emailValid, passwordValid,
    onInputChange, formState, isFormValid
  } = useForm(userInputs, userInputsValidation);

  const { updateAccessFunction } = useAuth();

  const onSubmitUserChange = (event) => {
    event.preventDefault();

    if (email == ' ' && !password) return;

    setFormSubmited(true);

    if (!isFormValid) return;

    setFormSubmited(false);

    updateAccessFunction(formState);
  }

  return (
    <form onSubmit={ onSubmitUserChange }>
      <div className="update_user_box">
        <TextField
          type='email'
          label='Email'
          name='email'
          value={ email === ' ' ? user?.email || '' : email }
          onChange={ onInputChange }
          helperText={ !!emailValid && formSubmited ? emailValid : '' }
          error={ !!emailValid && formSubmited }
        />

        <TextField
          type='password'
          label='Password'
          name='password'
          value={ password }
          onChange={ onInputChange }
          helperText={ !!passwordValid && formSubmited ? passwordValid : '' }
          error={ !!passwordValid && formSubmited }
        />

        <Button
          type='submit'
          variant='contained'
        >
          Submit
        </Button>
      </div>
    </form>
  )
}
