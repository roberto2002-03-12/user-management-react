import { useState, useRef } from 'react';
import { useAuth } from '../../hooks';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

export const UpdatePhoto = () => {
  const { updatePhotoFunction } = useAuth();
  const { user } = useSelector(state => state.auth);
  const [ filePhoto, setFilePhoto ] = useState('');

  const filePhotoRef = useRef(null);

  const handlePhotoButton = () => {
    filePhotoRef.current.click();
  }

  const onChangeFilePhoto = ({ target }) => {
    setFilePhoto(target.files[0]);
  }

  const onSubmitPhoto = (event) => {
    event.preventDefault();

    updatePhotoFunction(filePhoto);
  }

  return (
    <form onSubmit={ onSubmitPhoto }>
      <img 
        src={user?.profile?.photoUrl} 
        alt={user?.profile?.photoName} 
        loading='lazy' 
        className='update_photo_img'
      />
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'column',
          marginTop: '20px'
        }}
      >
        <input
          type="file"
          id='imgInput'
          ref={ filePhotoRef }
          onChange={ onChangeFilePhoto }
        />
        <button
          type='button'
          onClick={ handlePhotoButton }
          className='photo_button'
        >
          Change photo
        </button>
        <p className='file_input_name'>File: { filePhoto.name }</p>
        <Button
          variant='contained'
          type='submit'
        >
          Submit
        </Button>
      </div>
    </form>
  )
}
