import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { onLogged } from '../store'
import { HomePage } from '../app/user_management/pages'
import { LoginPage, RecoveryAccount, RegisterPage, UpdateProfile } from '../auth/pages'

export const AppRouter = () => {
  const { authState } = useSelector(state => state.auth);
  const authStateLocal = localStorage.getItem('stateAuth') || 'not-authenticated';
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStateLocal === 'authenticated') {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch(onLogged(user));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // there is dependency, ignore the message

  return (
    <Routes>
      {
        (authState === 'not-authenticated' && authStateLocal === 'not-authenticated' ? (
          <>
            <Route path='/' element={ <LoginPage /> } />
            <Route path='/password-recovery' element={ <RecoveryAccount /> } />
            <Route path='/register' element={ <RegisterPage /> } />
          </>
        ) : (
          <>
            <Route path='/home' element={ <HomePage /> } />
            <Route path='/update-profile' element={ <UpdateProfile /> } />
          </>
        ))
      }
      {/* Routes for non-authenticated and authenticated*/}
      <Route path='/' element={ <LoginPage/> }/>
    </Routes>
  )
}
