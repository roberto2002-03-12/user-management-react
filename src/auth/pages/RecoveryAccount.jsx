import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Checking, ChangePassword } from '../components';
import { Button, TextField } from '@mui/material';
import '../styles/RecoveryStyle.css'

export const RecoveryAccount = () => {
  const [email, setEmail] = useState('');
  const { recoveryPasswordFunction } = useAuth();
  const { emailState } = useSelector(state => state.auth);
  // const { successMessage } = useSelector(state => state.stateMsg);

  const onChangeEmail = ({ target }) => {
    setEmail(target.value);
  }

  const onSendRecovery = (event) => {
    event.preventDefault();

    recoveryPasswordFunction(email);
  }

  return (
    <div className='recovery_container'>
      <div className="recovery_box">
        <div className="recovery_content">
        {
          (emailState === 'not-sent' ? (
            <>
              <h2>Recovery your account</h2>
              <form onSubmit={ onSendRecovery }>
                <TextField 
                  required
                  type='email'
                  label='Email'
                  name='email'
                  value={ email }
                  onChange={ onChangeEmail }
                />
                <Button
                  variant='contained'
                  type='submit'
                  sx={{
                    backgroundColor: 'black',
                    '&:hover': {
                      backgroundColor: '#FFFFFF',
                      color: 'black',
                    },
                  }}
                >
                  Send mail
              </Button>
              <Link to='/'>Go back</Link>
              </form>
            </>
          ) : (emailState === 'sent' ? (
            <ChangePassword />
          ) : (
            <Checking />
          )))
        }
        </div>
      </div>
    </div>
  )
}
