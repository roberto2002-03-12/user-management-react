import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authState: 'not-authenticated', // authenticated, not-authenticated, checking
    emailState: 'not-sent', // sent, checking
    user: {},
  },
  reducers: {
    onCheckingAuth: (state) => {
      state.authState = 'checking';
      state.user = {};
    },
    onLogged: (state, { payload }) => {
      state.authState = 'authenticated';
      state.user = payload;
    },
    onLogout: (state) => {
      state.authState = 'not-authenticated',
      state.user = {};
    },
    onCheckingEmail: (state) => {
      state.emailState = 'checking';
    },
    onErrorEmail: (state) => {
      state.emailState = 'not-sent'
    },
    onSuccessEmail: (state) => {
      state.emailState = 'sent';
    },
    onSetUser: (state, { payload }) => {
      state.user = payload;
    },
  }
});

export const {
  onCheckingAuth,
  onLogged,
  onLogout,
  onCheckingEmail,
  onErrorEmail,
  onSuccessEmail,
  onSetUser,
} = authSlice.actions;