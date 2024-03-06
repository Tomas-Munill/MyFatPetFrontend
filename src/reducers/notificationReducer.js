import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    isSuccessful: false,
  },
  reducers: {
    setSuccessfulMessage(state, action) {
      state.message = action.payload;
      state.isSuccessful = true;
    },
    setErrorMessage(state, action) {
      state.message = action.payload;
      state.isSuccessful = false;
    },
    clearMessage(state) {
      state.message = '';
      state.isSuccessful = false;
    },
  },
});

export const showNotification = (message, isSuccessful) => {
  return async (dispatch) => {
    console.log('hola me ejecuto');
    if (isSuccessful) {
      dispatch(setSuccessfulMessage(message));
    } else {
      dispatch(setErrorMessage(message));
    }
    setTimeout(() => dispatch(clearMessage()), 5000);
  };
};

export const { setSuccessfulMessage, setErrorMessage, clearMessage } =
  notificationSlice.actions;
export default notificationSlice.reducer;
