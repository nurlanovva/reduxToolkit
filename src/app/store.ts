import { configureStore } from '@reduxjs/toolkit';
import ipReducer from '../features/IP';

const store = configureStore({
  reducer: {
    ip: ipReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
