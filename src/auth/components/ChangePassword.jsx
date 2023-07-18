import { useState } from 'react';
import { useForm, useAuth } from '../../hooks';
import { TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import '../styles/RecoveryStyle.css';

const inputsForm = {
  token: '',
  newPassword: '',
  repeatPassword: ''
}

const inputsFormValidate = {
  token: [(value) => value.length >= 70, 'Invalid token'],
  newPassword: [(value) => value.length >= 8, 'Invalid password'],
}

export const ChangePassword = () => {
  const [formSubmited, setFormSubmited] = useState(false);

  const {
    token, newPassword, repeatPassword,
    tokenValid, newPasswordValid,

    onInputChange,
    isFormValid,
    formState,
  } = useForm(inputsForm, inputsFormValidate);

  const { changePasswordRecoveryFunction } = useAuth();

  const onSubmitChangePassword = (event) => {
    event.preventDefault();

    setFormSubmited(true);

    if (!isFormValid) return;

    if (newPassword !== repeatPassword) {
      Swal.fire('Password must be the same', 'Please write your password correctly', 'error');
      return;
    }

    setFormSubmited(false);

    changePasswordRecoveryFunction(formState);
  };

  return (
    <>
      <h2>Change your password</h2>
      <form onSubmit={ onSubmitChangePassword }>
        <TextField
          required
          type='password'
          label='Token'
          name='token'
          value={ token }
          onChange={ onInputChange }
          error={ !!tokenValid && formSubmited }
          helperText={ !!tokenValid && formSubmited ? tokenValid : '' }
          size='small'
        />

        <TextField 
          required
          type='password'
          label='Password'
          name='newPassword'
          value={ newPassword }
          onChange={ onInputChange }
          error={ !!newPasswordValid && formSubmited }
          helperText={ !!newPasswordValid && formSubmited ? newPasswordValid : '' }
          size='small'
        />

        <TextField
          required
          type='password'
          label='Repeat password'
          name='repeatPassword'
          value={ repeatPassword }
          onChange={ onInputChange }
          size='small'
        />

        <Button
          type='submit'
          variant='contained'
          sx={{
            backgroundColor: 'black',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: 'black',
            },
          }}
        >
          Change password
        </Button>
      </form>
    </>
  )
}
