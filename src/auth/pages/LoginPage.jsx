import { useState } from 'react';
import { useForm, useAuth } from '../../hooks';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Checking } from '../components'
import '../styles/LoginPageStyle.css';

const textFieldStyle = {
  width: '260px'
}

const inputsLogin = {
  email: '',
  password: '',
}

const inputsLoginValidation = {
  email: [(value) => value.includes('@'), 'Email invalido'],
  password: [(value) => value.length >= 8, 'La contraseña debe contener 8 caracteres como minimo'],
}

export const LoginPage = () => {
  console.log('cuantas veces me actualizo')
  const { loginFunction } = useAuth();

  const [formSubmited, setFormSubmited] = useState(false);

  const { authState } = useSelector(state => state.auth);

  const {
    email, password,
    emailValid, passwordValid,

    onInputChange,
    isFormValid,
    formState,
  } = useForm(inputsLogin, inputsLoginValidation);

  const onSubmitLogin = (event) => {
    event.preventDefault();

    setFormSubmited(true);

    if (!isFormValid) return;

    setFormSubmited(false);
    loginFunction(formState);
  }

  return (
    <div className='login_container'>
      {
        (authState === 'checking' ? (
          <Checking />
        ) : (
          <div className="login_box">
            <div className="login_content">
              <h1 className='login_tittle'>Login</h1>
              <form onSubmit={ onSubmitLogin }>
                <div className="login_textfields">
                  <TextField
                    required
                    type='email'
                    name='email'
                    value={ email }
                    onChange={ onInputChange }
                    error={ !!emailValid && formSubmited }
                    helperText={ !!emailValid && formSubmited ? emailValid : '' }
                    label="Email" 
                    variant="outlined" 
                    size='medium' 
                    sx={ textFieldStyle }
                  />
                  <TextField 
                    required
                    type='password'
                    name='password' 
                    value={ password }
                    onChange={ onInputChange }
                    error={ !!passwordValid && formSubmited }
                    helperText={ !!passwordValid && formSubmited ? passwordValid : '' }
                    label="Password" 
                    variant="outlined" 
                    size='medium' 
                    sx={ textFieldStyle }
                  />
                </div>
                <div className="login_buttons">
                  <Button
                    variant='contained'
                    sx={{
                      width: '80%',
                      marginLeft: '35px',
                      backgroundColor: 'black',
                      '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: 'black',
                      },
                    }}
                    type='submit'
                  >
                    Login
                  </Button>
                  <div className='login_links_container'>
                    <Link to='/password-recovery' className='login_links'>Did you forget your password?</Link>
                    <Link to='/register' className='login_links'>Register</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ))
      }
    </div>
  )
}
