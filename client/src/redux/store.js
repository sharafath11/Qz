import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Correctly import the reducer

export const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});
