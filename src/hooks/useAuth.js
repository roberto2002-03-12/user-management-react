import userManagementApi from '../api/userManagementApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  onCheckingAuth, onLogged, onLogout, onCheckingEmail,
  onErrorEmail, onSuccessEmail,
  // state message
  onSubmit, onError, onChecking, onSetUser,
} from '../store';
import Swal from 'sweetalert2';

export const useAuth = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loginFunction = async (formData) => {
    dispatch(onCheckingAuth());
    try {
      const { data } = await userManagementApi.post('/auth/login', formData);
      Swal.fire('Logged', 'Successfully logged', 'success');
      localStorage.setItem('stateAuth', 'authenticated');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      // save data user in local storage, so we don't need to request everytime that user refresh the page
      localStorage.setItem('user', JSON.stringify(data.user)); 
      // remember to use JSON.parse(localStorage.getItem('user')) so you can get the object back
      dispatch(onLogged(data.user))
      navigate('/home');
    } catch (err) {
      Swal.fire('Error at trying to login', err.response?.data?.message, 'error');
      dispatch(onLogout());
    }
  };

  const logoutFunction = () => {
    dispatch(onLogout());
    localStorage.clear();
    navigate('/');
  };
  
  const recoveryPasswordFunction = async (email) => {
    dispatch(onCheckingEmail());
    try {
      const  { data } = await userManagementApi.post('/auth/recovery-password', { email });
      Swal.fire('Email sent', data.message, 'success');
      dispatch(onSuccessEmail());
    } catch (err) {
      Swal.fire('Error at trying to send an email', err.response?.data?.message, 'error');
      dispatch(onErrorEmail());
    }
  };

  const changePasswordRecoveryFunction = async (formData) => {
    let newFormData = { ...formData }
    try {
      delete newFormData.repeatPassword;
      const { data } = await userManagementApi.post('/auth/change-password-recovery', newFormData);
      Swal.fire('Password changed', data.message, 'success');
      navigate('/');
      dispatch(onErrorEmail());
    } catch (err) {
      Swal.fire('Error at changing password', err.response?.data?.message, 'error');
    }
  }

  const registerFunction = async (data, photo) => {
    let newData = { 
      ...data,
      user: {
        email: data.email,
        password: data.password,
      },
    }

    delete newData.email;
    delete newData.password;
    dispatch(onChecking());
    try {
      if (!photo) {
        await userManagementApi.post('/auth/register', newData);
        Swal.fire('Registered', 'You can login now', 'success');
      } else {
        const formData = new FormData();
        formData.append('firstName', newData.firstName);
        formData.append('lastName', newData.lastName);
        formData.append('dni', newData.dni);
        formData.append('phoneNumber', newData.phoneNumber);
        formData.append('birthDate', newData.birthDate);
        formData.append('sex', newData.sex);
        formData.append('address', newData.address);
        formData.append('user[email]', newData.user.email);
        formData.append('user[password]', newData.user.password);
        formData.append('photo', photo);
        await userManagementApi.post('/auth/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        Swal.fire('Registered', 'You can login now', 'success');
      }
      dispatch(onSubmit("It did work"));
      navigate('/');
    } catch (err) {
      dispatch(onError("it didn't work"));
      Swal.fire('Error at register process', err.response?.data?.message, 'error');
    }
  }

  const updateProfileFunction = async (obj) => {
    dispatch(onChecking());
    const filterObj = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(obj).filter(([key, value]) => value !== ' ')
    );
    // use this if you want to delete keys that has same value.
    // const filterObj = {};
    // Object.entries(obj).forEach(([key, value]) => {
    //   if (user.profile[key] !== value) {
    //     filterObj[key] = value;
    //   }
    // })
    try {
      const { data } = await userManagementApi.put('/profile/update-profile', filterObj);
      dispatch(onSubmit('worked'));
      dispatch(onSetUser(data.user));
      localStorage.setItem('user', JSON.stringify(data.user));
      Swal.fire('Updated', 'user updated', 'success');
    } catch (err) {
      dispatch(onError("It didn't work"));
      Swal.fire('Error at updating your profile', err.response?.data?.message, 'error');
    }
  };

  const updatePhotoFunction = async (file) => {
    dispatch(onChecking());
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const { data } = await userManagementApi.put('/profile/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire('Photo updated', '', 'success');
      dispatch(onSubmit('worked'));
      dispatch(onSetUser(data.user));
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      dispatch(onError("It didn't work"));
      Swal.fire('Error at updating your profile', err.response?.data?.message, 'error');
    }
  };

  const updateAccessFunction = async (obj) => {
    dispatch(onChecking());
    try {
      if (!obj.password) delete obj.password;
      if (obj.email == ' ') delete obj.email;
      const { data } = await userManagementApi.put('/user/update-user', obj);
      const newObj = {
        ...data,
        profile: {
          ...user.profile
        }
      }
      dispatch(onSetUser(newObj));
      localStorage.setItem('user', JSON.stringify(newObj));
      dispatch(onSubmit('It worked'));
      Swal.fire('Access updated', 'You can now access with different data', 'success');
    } catch (err) {
      dispatch(onError("It didn't work"));
      Swal.fire('Error at updating your account', err.response?.data?.message, 'error');
    }
  };

  return {
    loginFunction,
    logoutFunction,
    recoveryPasswordFunction,
    changePasswordRecoveryFunction,
    registerFunction,
    updateProfileFunction,
    updatePhotoFunction,
    updateAccessFunction,
  }
}
