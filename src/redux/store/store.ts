/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsApi } from '../api/albums/albumsApi';
import { photosApi } from '../api/photos/photosApi';

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware).concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>; //full state shape
export type AppDispatch = typeof store.dispatch; // dispatch that supports thunksgit checkout -b feature/users

export { store };
