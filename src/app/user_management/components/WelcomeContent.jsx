import { Button } from '@mui/material';
import { useAuth } from '../../../hooks';
import { Link } from 'react-router-dom';
import '../styles/WelcomeContent.css'

export const WelcomeContent = () => {
  const { logoutFunction } = useAuth();

  return (
    <div className='welcome_content'>
      <h2 className='welcome_tittle'>Welcome to my user management project</h2>
      <div className="welcome_box_text">
        <p>
          As you can notice you only have Login, Update, Recovery and Register.
          This is not all, you can check the branches for the full version.
        </p>
        <p>
          Remember, this user management project {" it's free"}, but I would appreciate if you mention me
          in your project in the package.json or in the footer of your page.
        </p>
      </div>
      <Button
        type='button'
        variant='outlined'
        sx={{
          margin: '0 auto',
        }}
      >
        <Link
          to='/update-profile'
          style={{
            textDecoration: 'none'
          }}
        >
          Update your profile
        </Link>
      </Button>

      <Button
        variant='contained'
        type='button'
        sx={{
          margin: '0 auto',
          width: '205px',
          marginTop: '20px'
        }}
        onClick={ () => logoutFunction() }
      >
        Close session
      </Button>
    </div>
  )
}
