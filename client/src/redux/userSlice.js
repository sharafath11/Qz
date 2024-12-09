import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const parseJson = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;  
  }
};

const initialState = {
  user: storedUser ? parseJson(storedUser) : null,  
  token: storedToken ? storedToken : null,         
  isAuthenticated: storedUser && storedToken ? true : false,  
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user; 
      state.token = action.payload.token; 
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});


export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
