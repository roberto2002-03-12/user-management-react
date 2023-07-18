import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material'
import { UpdatePersonalInformation, UpdateAccessInformation, UpdatePhoto, Checking } from '../components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/UpdateProfile.css';
import { Link } from 'react-router-dom';

const buttonStyle = {
  marginTop: '15px',
  width: '200px'
}

export const UpdateProfile = () => {
  const [view, setView] = useState(1);
  const { state } = useSelector(state => state.stateMsg);
  const { user } = useSelector(state => state.auth);

  return (
    <div className='update_container container'>
      <div className="update_container_content row">
        <div className="update_container_left col-xl-3">
          <div className='update_back_button' style={{ width: '100%' }}>
            <Link
              to='/home'
              style={{
                textDecoration: 'none',
                color: 'black'
              }}
            >
              <ArrowBackIcon/>
            </Link>
            <span>{' '}Go back</span>
          </div>
          <img src={ user?.profile?.photoUrl } alt="user profile" className='update_profile_img' loading='lazy'/>
          <h5 className='update_profile_fullname'>Profile</h5>
          <p
            style={{ textAlign: 'center', marginBottom: '0px', fontSize: '14px' }}
          >
            { user?.profile?.firstName } { user?.profile?.lastName }
          </p>
          <Button
            type='button'
            sx={ buttonStyle }
            variant='outlined'
            size='small'
            onClick={ () => setView(1) }
          >
            Update personal info
          </Button>
          <Button
            type='button'
            sx={ buttonStyle }
            variant='outlined'
            size='small'
            onClick={ () => setView(2) }
          >
            Update access
          </Button>
          <Button
            type='button'
            sx={ buttonStyle }
            variant='outlined'
            size='small'
            onClick={ () => setView(3) }
          >
            Update photo
          </Button>
        </div>
        <div className='update_container_right col-xl-9'>
          {
            view === 1 ? ( state === 'checking' ? <Checking /> : <UpdatePersonalInformation /> )
            : view === 2 ? ( state === 'checking' ? <Checking /> : <UpdateAccessInformation /> )
            : ( state === 'checking' ? <Checking /> : <UpdatePhoto /> )
          }
        </div>
      </div>
    </div>
  )
}
