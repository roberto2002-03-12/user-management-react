import { useState } from 'react';
import { useForm, useAuth } from '../../hooks';
import { useSelector } from 'react-redux';
import { 
  TextField, FormControl, Select, 
  InputLabel, MenuItem, Button,
} from '@mui/material';

const updateInputs = {
  firstName: ' ',
  lastName: ' ',
  dni: ' ',
  phoneNumber: ' ',
  birthDate: ' ',
  sex: ' ',
  address: ' '
}

const updateInputsValidate = {
  firstName: [(value) => (value === ' ' ? true : value.length >= 3), 'Your first name must have at least 3 characters'],
  lastName: [(value) => (value === ' ' ? true : value.length >= 3), 'Your last name must have at least 3 characters'],
  dni: [(value) => (value === ' ' ? true : value.length === 8), 'Invalid DNI'],
  phoneNumber: [(value) => (value === ' ' ? true : value.length >= 7), 'Invalid phone number'],
  address: [(value) => (value === ' ' ? true : value.length >= 7), 'Adress must be valid'],
}

const textFieldsStyles = {
  width: '223px',
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'grey'
  },
}

export const UpdatePersonalInformation = () => {
  const { user } = useSelector(state => state.auth);
  const { updateProfileFunction } = useAuth();
  const [ formSubmited, setFormSubmited ] = useState(false);

  const {
    firstName, lastName, dni, phoneNumber,
    birthDate, sex, address,

    firstNameValid, lastNameValid, dniValid, phoneNumberValid, 
    addressValid,

    onInputChange,
    formState,
    isFormValid,
  } = useForm(updateInputs, updateInputsValidate);

  const onSubmitUpdate = (event) => {
    event.preventDefault();
    
    setFormSubmited(true);
    
    if (!isFormValid) return;

    setFormSubmited(false);
    
    updateProfileFunction(formState);
  }

  return (
    <form onSubmit={ onSubmitUpdate }>
    <div className="update_box">
      <div className="row update_content">

        <div className="col-xl-6 update_input">
          <TextField
            label='First Name'
            name='firstName'
            sx={ textFieldsStyles }
            value={ firstName === ' ' ? user?.profile?.firstName || '' : firstName }
            // defaultValue={ user?.profile?.firstName || '' }
            onChange={ onInputChange }
            helperText={ !!firstNameValid && formSubmited ? firstNameValid : '' }
            error={ !!firstNameValid && formSubmited }
          />
        </div>

        <div className="col-xl-6 update_input">
          <TextField
            label='Last Name'
            name='lastName'
            sx={ textFieldsStyles }
            value={ lastName === ' ' ? user?.profile?.lastName || '' : lastName }
            // defaultValue={ user?.profile?.lastName || '' }
            onChange={ onInputChange }
            helperText={ !!lastNameValid && formSubmited ? lastNameValid : '' }
            error={ !!lastNameValid && formSubmited }
          />
        </div>

        <div className="col-xl-6 update_input">
          <TextField
            type='number'
            label='DNI'
            name='dni'
            sx={ textFieldsStyles }
            value={ dni === ' ' ? user?.profile?.dni || '' : dni }
            // defaultValue={ user?.profile?.dni || '' }
            onChange={ onInputChange }
            helperText={ !!dniValid && formSubmited ? dniValid : '' }
            error={ !!dniValid && formSubmited }
          />
        </div>

        <div className="col-xl-6 update_input">
          <TextField
            type='number'
            label='Phone Number'
            name='phoneNumber'
            sx={ textFieldsStyles }
            value={ phoneNumber === ' ' ? user?.profile?.phoneNumber || '' : phoneNumber }
            // defaultValue={ user?.profile?.phoneNumber || '' }
            onChange={ onInputChange }
            helperText={ !!phoneNumberValid && formSubmited ? phoneNumberValid : '' }
            error={ !!phoneNumberValid && formSubmited }
          />
        </div>

        <div className="col-xl-6 update_input" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className='update_date_tittle'>Birth date</p>
          <input
            type="date"
            id='update_date_custom'
            name='birthDate'
            // defaultValue={ user?.profile?.birthDate || '' }
            value={ birthDate === ' ' ? user?.profile?.birthDate || '' : birthDate }
            onChange={ onInputChange }
          />
        </div>

        <div className="col-xl-6 update_input">
          <FormControl sx={ textFieldsStyles }>
            <InputLabel id="register_sex_label">Sex</InputLabel>
            <Select
              labelId="register_sex_label"
              label="Sex"
              className='custom_select'
              name='sex'
              value={ sex === ' ' ? user?.profile?.sex || 'female' : sex }
              // defaultValue={ user?.profile?.sex || '' }
              onChange={ onInputChange }
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="col-xl-6 update_input">
          <TextField
            type='text'
            label='Adress'
            name='address'
            value={ address === ' ' ? user?.profile?.address || '' : address }
            // defaultValue={ user?.profile?.address || '' }
            onChange={ onInputChange }
            helperText={ !!addressValid && formSubmited ? addressValid : '' }
            error={ !!addressValid && formSubmited }
          />
        </div>

        <hr />

        <div className="col-xl-12 update_buttons">
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
  )
}
