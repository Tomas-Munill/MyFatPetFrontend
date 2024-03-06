import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/loginService';
import { setToken } from '../services/tokenService';
//import { setErrorMessage, clearMessage } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
    checkLoggedIn() {
      const loggedUser = window.localStorage.getItem('MyFatPetLoggedUser');
      if (loggedUser) {
        const user = JSON.parse(loggedUser);
        setToken(user.token);
        return user;
      }
      return null;
    },
  },
});

export const logIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('MyFatPetLoggedUser', JSON.stringify(user));
      setToken(user.token);
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
      /*
      dispatch(setErrorMessage(error.response.data.error));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      */
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('MyFatPetLoggedUser');
    setToken('');
    dispatch(clearUser());
  };
};

export const { setUser, clearUser, checkLoggedIn } = userSlice.actions;
export default userSlice.reducer;
