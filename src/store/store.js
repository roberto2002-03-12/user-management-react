import { configureStore } from '@reduxjs/toolkit';
import { authSlice, stateMsgSlice } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    stateMsg: stateMsgSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});
