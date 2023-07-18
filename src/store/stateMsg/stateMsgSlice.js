import { createSlice } from '@reduxjs/toolkit';

export const stateMsgSlice = createSlice({
  name: 'stateMsg',
  initialState: {
    successMessage: undefined,
    errorMessage: undefined,
    state: 'not-sent' // sent, checking
  },
  reducers: {
    onSubmit: (state, { payload }) => {
      state.state = 'sent';
      state.successMessage = payload;
    },
    onError: (state, { payload }) => {
      state.state = 'not-sent';
      state.errorMessage = payload;
    },
    onChecking: (state) => {
      state.state = 'checking';
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = undefined;
    }
  }
});

export const {
  onSubmit,
  onError,
  onChecking,
  clearErrorMessage,
  clearSuccessMessage,
} = stateMsgSlice.actions;