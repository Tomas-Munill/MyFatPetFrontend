import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
//import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer.js';
import notificationReducer from './reducers/notificationReducer.js';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
