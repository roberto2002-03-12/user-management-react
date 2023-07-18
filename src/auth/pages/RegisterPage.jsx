import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm, useAuth } from '../../hooks';
import {
  Button, TextField, FormControl,
  InputLabel, Select, MenuItem,
} from '@mui/material';
import { Checking } from '../components';
import '../styles/RegisterStyle.css';

const textFieldsStyles = {
  width: '223px',
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'grey'
  },
}

const registerInputs = {
  firstName: '',
  lastName: '',
  dni: '',
  phoneNumber: '',
  birthDate: '',
  sex: '',
  address: '',
  email: '',
  password: '',
}

const registerInputsValidation = {
  firstName: [(value) => value.length >= 3, 'Your first name must have at least 3 characters'],
  lastName: [(value) => value.length >= 3, 'Your last name must have at least 3 characters'],
  dni: [(value) => value.length === 8, 'Invalid DNI'],
  phoneNumber: [(value) => value.length >= 7, 'Invalid phone number'],
  address: [(value) => value.length >= 7, 'Adress must be valid'],
  email: [(value) => value.includes('@'), 'Invalid email'],
  password: [(value) => value.length >= 8, 'Password has to be at least 8 characters'],
}

export const RegisterPage = () => {
  const { registerFunction } = useAuth();

  const { state } = useSelector(state => state.stateMsg);
  // inputs
  const {
    firstName, lastName, dni, phoneNumber, 
    birthDate, sex, address, email, password,

    firstNameValid, lastNameValid, dniValid, phoneNumberValid, 
    addressValid, emailValid, passwordValid,

    formState, onInputChange, isFormValid, 
  } = useForm(registerInputs, registerInputsValidation);

  // file
  const [filePhoto, setFilePhoto] = useState('');
  // form state
  const [formSubmited, setFormSubmited] = useState(false);
  // reference of input file
  const fileInputRef = useRef(null);
  // reference to the input file
  const handlePhotoButton = () => {
    fileInputRef.current.click();
  }
  // declarete photo
  const onChangePhotoButton = (event) => {
    setFilePhoto(event.target.files[0])
  }
  // the name it says it, so i don't need to explain, but just in case someone needs it.
  const onRegisterUser = (event) => {
    event.preventDefault();

    setFormSubmited(true);
    console.log('los datos llegaron');
    if (!isFormValid) return;

    setFormSubmited(false);
    registerFunction(formState, filePhoto)
  }

  return (
    <div className='register_container'>
      {
        (state !== 'checking' ? (
          <form onSubmit={ onRegisterUser }>
          <div className="register_box">
            <div className="row register_content">
              <h5 className='register_title'>Personal information</h5>
              <div className="col-xl-6 register_textfield">
                <TextField
                  required
                  type='text'
                  label='First name'
                  name='firstName'
                  sx={ textFieldsStyles }
                  value={ firstName }
                  onChange={ onInputChange }
                  helperText={ !!firstNameValid && formSubmited ? firstNameValid : '' }
                  error={ !!firstNameValid && formSubmited }
                />
              </div>

              <div className="col-xl-6 register_textfield">
                <TextField
                  required
                  type='text'
                  label='Last name'
                  name='lastName'
                  sx={ textFieldsStyles }
                  value={ lastName }
                  onChange={ onInputChange }
                  helperText={ !!lastNameValid && formSubmited ? lastNameValid : '' }
                  error={ !!lastNameValid && formSubmited }
                />
              </div>

              <div className="col-xl-6 register_textfield">
                <TextField
                  required
                  type='number'
                  label='DNI'
                  name='dni'
                  sx={ textFieldsStyles }
                  value={ dni }
                  onChange={ onInputChange }
                  helperText={ !!dniValid && formSubmited ? dniValid : '' }
                  error={ !!dniValid && formSubmited }
                />
              </div>

              <div className="col-xl-6 register_textfield">
                <TextField
                  required
                  type='number'
                  label='Phone Number'
                  name='phoneNumber'
                  sx={ textFieldsStyles }
                  value={ phoneNumber }
                  onChange={ onInputChange }
                  helperText={ !!phoneNumberValid && formSubmited ? phoneNumberValid : '' }
                  error={ !!phoneNumberValid && formSubmited }
                />
              </div>

              <div className="col-xl-6 register_textfield" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p className='input_date_tittle'>Birth date</p>
                <input 
                  required
                  type="date"
                  id='input_date_custom'
                  name='birthDate'
                  value={ birthDate }
                  onChange={ onInputChange }
                />
              </div>

              <div className="col-xl-6 register_textfield">
                <FormControl sx={ textFieldsStyles }>
                  <InputLabel id="register_sex_label">Sex</InputLabel>
                  <Select
                    required
                    labelId="register_sex_label"
                    label="Sex"
                    className='custom_select'
                    name='sex'
                    value={ sex }
                    onChange={ onInputChange }
                  >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-xl-6 register_textfield">
                <TextField
                  required
                  type='text'
                  label='Adress'
                  name='address'
                  value={ address }
                  onChange={ onInputChange }
                  helperText={ !!addressValid && formSubmited ? addressValid : '' }
                  error={ !!addressValid && formSubmited }
                />
              </div>

              <div className="col-xl-6 register_textfield">
                <p className='file_input_title'>Photo (optional)</p>
                <input 
                  type="file"
                  id='imgInput'
                  ref={ fileInputRef }
                  onChange={ onChangePhotoButton }
                />
                <button
                  type='button'
                  onClick={ handlePhotoButton }
                  className='photo_button'
                >
                  Upload photo
                </button>
                <p className='file_input_name'>File: { filePhoto.name }</p>
              </div>

              <hr />

              <h5 className='register_title'> Email and password </h5>

              <div className="col-xl-6 register_textfield">
                <TextField
                  required
                  type='email'
                  label='Email'
                  name='email'
                  value={ email }
                  onChange={ onInputChange }
                  helperText={ !!emailValid && formSubmited ? emailValid : '' }
                  error={ !!emailValid && formSubmited }
                />
              </div>
              
              <div className="col-xl-6 register_textfield">
                <TextField
                  required
                  type='password'
                  label='Password'
                  name='password'
                  value={ password }
                  onChange={ onInputChange }
                  helperText={ !!passwordValid && formSubmited ? passwordValid : '' }
                  error={ !!passwordValid && formSubmited }
                />
              </div>

              <div className="col-xl-12 register_buttons">
                <Button
                  variant='outlined'
                >
                  <Link to='/' className='register_cancel_link'>
                    Cancel
                  </Link>
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          </form>
        ) : (
          <Checking />
        ))
      }
      
    </div>
  )
}
