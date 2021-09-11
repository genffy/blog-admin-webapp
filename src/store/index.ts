import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import loginSlice from 'views/login/store.slice'
import dashboardSlice from 'views/dashboard/store.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginSlice,
    dashboard: dashboardSlice
  },
});

