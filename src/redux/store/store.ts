/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; //full state shape
export type AppDispatch = typeof store.dispatch; // dispatch that supports thunksgit checkout -b feature/users

export { store };
